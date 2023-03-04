package pl.kolendateam.dadcard.characterCard;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.CharacterSetRaceDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.race.RaceRepository;
import pl.kolendateam.dadcard.race.entity.Race;

@RestController
@RequestMapping("character-card")
public class CharacterController {
    

    CharacterRepository characterRepository;
    RaceRepository raceRepository;

    @Autowired
    public CharacterController(CharacterRepository characterRepository,RaceRepository raceRepository){
        this.characterRepository = characterRepository;
        this.raceRepository = raceRepository;
    }

    @PostMapping(value="",consumes = {"application/json"})
    public Character create(@RequestBody CharacterDTO characterDTO){
        Character character = new Character(characterDTO.characterName,characterDTO.playerName);

        this.characterRepository.save(character);

        return character;
    }

    @PostMapping(value="{id}/race",consumes = {"application/json"})
    public Character setRace(@PathVariable int id, @RequestBody CharacterSetRaceDTO characterDTO) {
        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character =  characterOpt.get();



        Optional<Race> raceOpt = this.raceRepository.findById(id);
        if(!raceOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Race Not Found");
        }
        Race race = raceOpt.get();

        character.setRace(race.getRacesName());
        character.setSubRace(race.getSubRaceName());
        character.setRegion(race.getSubRaceName());
        character.setGod(race.getSubRaceName());

        this.characterRepository.save(character);

        return character;
    }

}
