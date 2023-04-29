package pl.kolendateam.dadcard.abilitys;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.AbilityBonus;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.abilitys.repository.AbilityBonusRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("")
public class AbilitysController {

    CharacterRepository characterRepository;
    AbilityBonusRepository abilityBonusRepository;

    @Autowired
    AbilitysController(CharacterRepository characterRepository, AbilityBonusRepository abilityBonusRepository){
        this.characterRepository = characterRepository;
        this.abilityBonusRepository = abilityBonusRepository;
    }

    @PostMapping(value="{id}/ability",consumes = {"application/json"})
    public CharacterDTO setCharacterAbility(@PathVariable int id, @RequestBody AbilitysDTO abilitysDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }
        
        Character character = characterOpt.get();  

        Abilitys abilitys = new Abilitys();

        abilitys.setStreght(abilitysDTO.streght);
        abilitys.setDextrity(abilitysDTO.dextrity);
        abilitys.setConstitution(abilitysDTO.constitution);
        abilitys.setIntelligence(abilitysDTO.intelligence);
        abilitys.setWisdom(abilitysDTO.wisdom);
        abilitys.setCharisma(abilitysDTO.charisma);

        Optional<AbilityBonus> valueAbilityStreght = this.abilityBonusRepository.findBonusByValue(abilitysDTO.streght);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Streght Not Found");
        }

        AbilityBonus bonusAbilityStreght = valueAbilityStreght.get();
        abilitys.setStreghtBonus(bonusAbilityStreght.getBonus());

        Optional<AbilityBonus> valueAbilityDextrity = this.abilityBonusRepository.findBonusByValue(abilitysDTO.dextrity);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Dextrity Not Found");
        }

        AbilityBonus bonusAbilityDextrity = valueAbilityDextrity.get();
        abilitys.setDextrityBonus(bonusAbilityDextrity.getBonus());

        Optional<AbilityBonus> valueAbilityConstitution = this.abilityBonusRepository.findBonusByValue(abilitysDTO.constitution);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Constitution Not Found");
        }

        AbilityBonus bonusAbilityConstitution = valueAbilityConstitution.get();
        abilitys.setConstitutionBonus(bonusAbilityConstitution.getBonus());

        Optional<AbilityBonus> valueAbilityIntelligence = this.abilityBonusRepository.findBonusByValue(abilitysDTO.intelligence);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Intelligence Not Found");
        }

        AbilityBonus bonusAbilityintelligence = valueAbilityIntelligence.get();
        abilitys.setIntelligenceBonus(bonusAbilityintelligence.getBonus());

        Optional<AbilityBonus> valueAbilityWisdom = this.abilityBonusRepository.findBonusByValue(abilitysDTO.wisdom);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Wisdom Not Found");
        }

        AbilityBonus bonusAbilityWisdom = valueAbilityWisdom.get();
        abilitys.setWisdomBonus(bonusAbilityWisdom.getBonus());

        Optional<AbilityBonus> valueAbilityCharisma = this.abilityBonusRepository.findBonusByValue(abilitysDTO.charisma);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Value Charisma Not Found");
        }

        AbilityBonus bonusAbilityCharisma = valueAbilityCharisma.get();
        abilitys.setCharismaBonus(bonusAbilityCharisma.getBonus());
        
        character.setAbilitys(abilitys);

        this.characterRepository.save(character);

        return new CharacterDTO(character);
    }
    
}