package pl.kolendateam.dadcard.characterCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("character-card")
public class CharacterController {
    

    CharacterRepository characterRepository;

    @Autowired
    public CharacterController(CharacterRepository characterRepository){
        this.characterRepository = characterRepository;
    }

    @PostMapping(value="",consumes = {"application/json"})
    public Character create(@RequestBody CharacterDTO characterDTO){
        Character character = new Character(characterDTO.characterName,characterDTO.playerName);

        this.characterRepository.save(character);

        return character;
    }

    @PostMapping(value="{id}/ability",consumes = {"application/json"})
    public Character setCharacterAbility(@PathVariable int id, @RequestBody AbilityDTO abilityDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();  
        
       
        Abilitys test = new Abilitys();

        this.characterRepository.save(character);

        return character;

    }

}
