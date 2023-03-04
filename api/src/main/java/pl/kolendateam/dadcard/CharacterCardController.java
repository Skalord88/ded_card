package pl.kolendateam.dadcard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.entity.CharacterCard;
import pl.kolendateam.dadcard.characterCard.repository.CharacterCardRepository;

@RestController
@RequestMapping("character")
public class CharacterCardController {
    
    CharacterCardRepository characterCardRepository;

    @Autowired
    public CharacterCardController(CharacterCardRepository characterCardRepository){

        this.characterCardRepository = characterCardRepository;

    }

    @PostMapping(value = "ability",consumes = {"application/json"})
    public CharacterCard abilityCharacterCard(@RequestBody AbilityDTO abilityDTO){

        CharacterCard ability = new CharacterCard();

        ability.setStreght(abilityDTO.streght);
        ability.setDextrity(abilityDTO.dextrity);
        ability.setConstitution(abilityDTO.constitution);
        ability.setIntelligence(abilityDTO.intelligence);
        ability.setWisdom(abilityDTO.wisdom);
        ability.setCharisma(abilityDTO.charisma);

        this.characterCardRepository.save(ability);

        return ability;

    }

}
