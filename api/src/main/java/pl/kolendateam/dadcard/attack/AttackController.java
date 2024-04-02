package pl.kolendateam.dadcard.attack;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.dto.AttackDTO;
import pl.kolendateam.dadcard.attack.dto.AttackVsArmorClassDTO;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.attack.repository.AttacksRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("attack")
public class AttackController {

    CharacterRepository characterRepository;
    AttacksRepository attacksRepository;

    @Autowired
    AttackController(
            CharacterRepository characterRepository,
            AttacksRepository attacksRepository) {
        this.characterRepository = characterRepository;
        this.attacksRepository = attacksRepository;
    }

    @PostMapping(value = "{id}/attackAC", consumes = { "application/json" })
    public AttackVsArmorClassDTO attackVsArmorClass(@PathVariable short id,
            @RequestBody AttackDTO attackDTO) {

        List<Character> characterOpt = this.characterRepository.findAll();

        Character character1 = new Character();
        Character character2 = new Character();

        for (Character ch : characterOpt) {
            if (ch.id == id) {
                character1 = ch;
            }

            if (ch.id == attackDTO.idA) {
                character2 = ch;
            }
        }

        Abilitys ab = character1.getAbilitys();

        int resultat = attackDTO.d20 + (int) character1.getBab() +
                ab.bonusStreght(ab) +
                character1.getSize().getBonusAttackAc();

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
                character2.getArmorClass(), character2.getAbilitys(), character2.getSize());

        boolean isHit = false;

        if (resultat >= armorClassTotal2.ACTotal(armorClassTotal2)) {
            isHit = true;
        }

        return new AttackVsArmorClassDTO(character1, character2, isHit);
    }

    @PostMapping(value = "{id}", consumes = { "application/json" })
    public CharacterDTO setAttack(
            @PathVariable short id,
            @RequestBody AttacksDTO characterAttacksDTO) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);
        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Character Not Found");
        }
        Character character = characterOpt.get();

        Optional<Attacks> attacksOpt = this.attacksRepository.findById(character.getInventory().getId());
        if (!attacksOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Character Not Found");
        }

        Attacks characterAttacks = attacksOpt.get();

        characterAttacks.setCharactersAttacks(characterAttacksDTO);

        this.attacksRepository.save(characterAttacks);

        return new CharacterDTO(character, characterAttacks);
    }

}
