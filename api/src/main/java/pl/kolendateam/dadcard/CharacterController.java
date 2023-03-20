package pl.kolendateam.dadcard;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.dto.AbilityMapperDTO;
import pl.kolendateam.dadcard.characterCard.dto.CharactertAbilityDTO;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("character-card")
public class CharacterController {
    
    CharacterRepository characterRepository;
    CharactertAbilityDTO charactertAbilityDTO;


    @Autowired
    public CharacterController(CharacterRepository characterRepository){

        this.characterRepository = characterRepository;

    }

    @PostMapping(value="{id}/ability",consumes = {"application/json"})
    public Character setCharacterAbility(@PathVariable int id, @RequestBody AbilityDTO abilityDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        String ability = AbilityMapperDTO.toMapAbilityDTO(abilityDTO);     

        charactertAbilityDTO.setAbilityDTO(ability);

        this.characterRepository.save(character);

        return character;

    }

}
