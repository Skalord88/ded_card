package pl.kolendateam.dadcard.characterCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.entity.CharacterAbility;
import pl.kolendateam.dadcard.characterCard.repository.CharacterAbilityRepository;

@RestController
@RequestMapping("character")
public class CharacterAbilityController {
    
    CharacterAbilityRepository characterAbilityRepository;

    @Autowired
    public CharacterAbilityController(CharacterAbilityRepository characterAbilityRepository){
        this.characterAbilityRepository = characterAbilityRepository;
    }

    @PostMapping(value = "ability",consumes = {"application/json"})
    public CharacterAbility abilityCharacterCard(@RequestBody AbilityDTO abilityDTO){

        CharacterAbility ability = new CharacterAbility(abilityDTO.streght,abilityDTO.dextrity,abilityDTO.constitution,
        abilityDTO.intelligence,abilityDTO.wisdom,abilityDTO.charisma);

        this.characterAbilityRepository.save(ability);

        return ability;
    }
}
