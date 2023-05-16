package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.race.dto.RaceBaseDTO;
import pl.kolendateam.dadcard.race.dto.RegionBaseDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceBaseDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.Region;
import pl.kolendateam.dadcard.race.repository.RaceRepository;
import pl.kolendateam.dadcard.race.repository.RegionRepository;

@RestController
@RequestMapping("race")
public class RaceController {

    RaceRepository raceRepository;
    RegionRepository regionRepository;
    CharacterRepository characterRepository;

    @Autowired
    RaceController(RaceRepository raceRepository,CharacterRepository characterRepository) {
        this.raceRepository = raceRepository;
        this.characterRepository = characterRepository;
    }

    @GetMapping("")
    public ArrayList<RaceBaseDTO> getAll() {
        List<Race> races = this.raceRepository.findAll();

        return MaperListRaceToDTO.toRaceBaseDTO(races);
    }

    @GetMapping("{id}/region")
    public ArrayList<RegionBaseDTO> getRegionsForRace(@PathVariable int id){
        Optional<Race> raceOpt = this.raceRepository.findById(id);

        if(!raceOpt.isPresent()){
            throw new ResponseStatusException(
           HttpStatus.NOT_FOUND, "Race Not Found");
        }

        List<Region> regions = List.copyOf(raceOpt.get().getAvailableRegions());

        return MaperListRegionToDTO.toRegionBaseDTO(regions);
    }

    @PostMapping(value = "{id}/race", consumes = { "application/json" })
    public CharacterDTO setSubRaceToCharacter(@PathVariable int id, @RequestBody SubRaceBaseDTO subRaceBaseDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Optional<Race> raceOpt = this.raceRepository.findById(subRaceBaseDTO.id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();
        Race race = raceOpt.get();

        if(race.getAbilitys() != null){
            character.addAbilityRace(race.getAbilitys());
        }
        if(race.getSkills() != null){
            character.addSkillRace(race.getSkills());
        }
        
        character.raceLevelAdjustment(race.getLevelAdjustment());

        if(race.getArmorClass() != null){
        character.raceBonusArmorClass(race.getArmorClass());}

        character.setCharacterRace(race);

        this.characterRepository.save(character);

        return new CharacterDTO (character);
    }
}
