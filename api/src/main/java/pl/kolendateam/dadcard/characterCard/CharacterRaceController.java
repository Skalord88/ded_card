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
@RequestMapping("race")
public class CharacterRaceController {
    

    CharacterRaceRepository characterRaceRepository;

    @Autowired
    public CharacterRaceController(CharacterRaceRepository characterRaceRepository){
        this.characterRaceRepository = characterRaceRepository;
    }

    @PostMapping(value="race",consumes = {"application/json"})
    public CharacterRace createCharacterRace(@RequestBody RaceDTO raceDTO){
        CharacterRace race = new CharacterRace (raceDTO.raceName,raceDTO.subRaceName);

        this.characterRaceRepository.save(race);

        return race;
    }

}
