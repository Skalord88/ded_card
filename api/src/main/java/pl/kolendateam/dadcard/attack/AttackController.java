package pl.kolendateam.dadcard.attack;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.attack.dto.AttacksDTO;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.attack.repository.AttacksRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;

@CrossOrigin
@RestController
@RequestMapping("attack")
public class AttackController {

  CharacterRepository characterRepository;
  ItemsRepository itemsRepository;
  AttacksRepository attacksRepository;

  @Autowired
  AttackController(
    CharacterRepository characterRepository,
    ItemsRepository itemsRepository,
    AttacksRepository attacksRepository
  ) {
    this.characterRepository = characterRepository;
    this.itemsRepository = itemsRepository;
    this.attacksRepository = attacksRepository;
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setAttack(
    @PathVariable int id,
    @RequestBody AttacksDTO characterAttacksDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);
    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }
    Character character = characterOpt.get();

    Optional<Attacks> attacksOpt =
      this.attacksRepository.findById(character.getAttacks().getId());
    if (!attacksOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    List<Items> itemsList = this.itemsRepository.findAll();

    Attacks characterAttacks = attacksOpt.get();

    characterAttacks.setCharactersAttacks(characterAttacksDTO, itemsList);

    this.attacksRepository.save(characterAttacks);

    Inventory emptyInventory = new Inventory();
    List<ClassPc> emptyClassList = new ArrayList<ClassPc>();

    return new CharacterDTO(
      character
      // ,
      // emptyInventory,
      // characterAttacks,
      // emptyClassList
    );
  }
}
// @PostMapping(value = "{id}/attackAC", consumes = { "application/json" })
// public AttackVsArmorClassDTO attackVsArmorClass(
//   @PathVariable short id,
//   @RequestBody AttackDTO attackDTO
// ) {
//   List<Character> characterOpt = this.characterRepository.findAll();
//   Character character1 = new Character();
//   Character character2 = new Character();
//   for (Character ch : characterOpt) {
//     if (ch.id == id) {
//       character1 = ch;
//     }
//     if (ch.id == attackDTO.idA) {
//       character2 = ch;
//     }
//   }
//   Abilitys ab = character1.getAbilitys();
//   int resultat =
//     attackDTO.d20 +
//     (int) character1.getBab() +
//     ab.bonusStreght(ab) +
//     character1.getSize().getBonus();
//   ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
//     character2.getArmorClass(),
//     character2.getAbilitys(),
//     character2.getSize()
//   );
//   boolean isHit = false;
//   if (resultat >= armorClassTotal2.ACTotal(armorClassTotal2)) {
//     isHit = true;
//   }
//   return new AttackVsArmorClassDTO(character1, character2, isHit);
// }
// @GetMapping(value = "{id}")
// public CharacterDTO getAttack(@PathVariable int id) {
//   Optional<Character> characterOpt = this.characterRepository.findById(id);
//   if (!characterOpt.isPresent()) {
//     throw new ResponseStatusException(
//       HttpStatus.NOT_FOUND,
//       "Character Not Found"
//     );
//   }
//   Character character = characterOpt.get();
//   Optional<Attacks> attacksOpt =
//     this.attacksRepository.findById(character.getAttacks().getId());
//   if (!attacksOpt.isPresent()) {
//     throw new ResponseStatusException(
//       HttpStatus.NOT_FOUND,
//       "Character Not Found"
//     );
//   }
//   Attacks characterAttacks = attacksOpt.get();
//   return new CharacterDTO(character, characterAttacks);
// }
