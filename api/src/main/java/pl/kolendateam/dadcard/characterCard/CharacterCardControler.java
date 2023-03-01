package pl.kolendateam.dadcard.characterCard;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.CreateDTO;
import pl.kolendateam.dadcard.characterCard.entity.CharacterCard;
import pl.kolendateam.dadcard.characterCard.repository.CharacterCardRepository;

@RestController
@RequestMapping("character")
public class CharacterCardControler {

    CharacterCardRepository characterRepository;

    @Autowired
    public CharacterCardControler(CharacterCardRepository characterRepository){
        this.characterRepository = characterRepository;
    }

    @PostMapping(value = "create",consumes = {"application/json"})
    public CharacterCard createCharacterCard(@RequestBody CreateDTO createDTO){

        CharacterCard character = new CharacterCard(createDTO.raceName,createDTO.subRaceName);

        this.characterRepository.save(character);

        return character;
    }
}
