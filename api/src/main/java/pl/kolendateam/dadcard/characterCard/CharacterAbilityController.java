package pl.kolendateam.dadcard.characterCard;

import pl.kolendateam.dadcard.characterCard.repository.CharacterCardRepository;

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
}
