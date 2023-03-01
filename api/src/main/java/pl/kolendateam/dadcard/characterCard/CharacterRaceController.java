package pl.kolendateam.dadcard.characterCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.CharacterRaceDTO;
import pl.kolendateam.dadcard.characterCard.entity.CharacterRace;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRaceRepository;

@RestController
@RequestMapping("character")
public class CharacterRaceController {
    

    CharacterRaceRepository characterRaceRepository;

    @Autowired
    public CharacterRaceController(CharacterRaceRepository characterRaceRepository){
        this.characterRaceRepository = characterRaceRepository;
    }

    @PostMapping(value="race",consumes = {"application/json"})
    public CharacterRace createCharacterRace(@RequestBody CharacterRaceDTO characterRaceDTO){
        CharacterRace race = new CharacterRace (characterRaceDTO.raceName,characterRaceDTO.subRaceName);

        this.characterRaceRepository.save(race);

        return race;
    }

}
