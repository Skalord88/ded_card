package pl.kolendateam.dadcard.characterCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
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

}
