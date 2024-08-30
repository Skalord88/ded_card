package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.race.repository.RaceRepository;
import pl.kolendateam.dadcard.race.repository.RegionRepository;
import pl.kolendateam.dadcard.race.repository.SubRaceRepository;

@CrossOrigin
@RestController
@RequestMapping("race")
public class RaceController {

  RaceRepository raceRepository;
  SubRaceRepository subRaceRepository;
  RegionRepository regionRepository;
  CharacterRepository characterRepository;

  @Autowired
  RaceController(
    RaceRepository raceRepository,
    CharacterRepository characterRepository,
    SubRaceRepository subRaceRepository
  ) {
    this.raceRepository = raceRepository;
    this.characterRepository = characterRepository;
    this.subRaceRepository = subRaceRepository;
  }

  @GetMapping("")
  public ArrayList<RaceDTO> getAll() {
    List<Race> races = this.raceRepository.findAll();

    return MaperListRaceToDTO.toListRaceDTO(races);
  }

  @GetMapping("sub")
  public ArrayList<SubRaceDTO> getAllSub() {
    List<SubRace> races = this.subRaceRepository.findAll();

    return MaperListRaceToDTO.toListSubRaceDTO(races);
  }

  // @GetMapping("{id}/region")
  // public ArrayList<RegionBaseDTO> getRegionsForRace(@PathVariable int id) {
  //   Optional<Race> raceOpt = this.raceRepository.findById(id);

  //   if (!raceOpt.isPresent()) {
  //     throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Race Not Found");
  //   }

  //   List<Region> regions = List.copyOf(raceOpt.get().getAvailableRegions());

  //   return MaperListRegionToDTO.toRegionBaseDTO(regions);
  // }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setSubRaceToCharacter(
    @PathVariable int id,
    @RequestBody SubRaceDTO subRaceBaseDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Optional<SubRace> raceOpt =
      this.subRaceRepository.findById(subRaceBaseDTO.id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();
    SubRace race = raceOpt.get();

    // character.setSize(race.getSize());

    // character.sizeCharacter(race.getSize());

    // character.addSpeed(race.getSpeed());

    // if (race.getAbilitys() != null) {
    //   character.addAbilityRace(race.getAbilitys());
    // }
    // if (race.getSkills() != null) {
    //   character.addSkill(race.getSkills());
    // }

    // ArrayList<ClassSkills> findHide = character.getClassSkills();
    // for (ClassSkills clSk : findHide) {
    //   if (clSk.getNameSkill().equals("Hide")) {
    //     clSk.setSkillBonus(
    //       clSk.getSkillBonus() + character.getSize().getHide()
    //     );
    //   }
    // }

    // if (race.getLevelAdjustment() != 0) {
    //   character.raceLevelAdjustment(race.getLevelAdjustment());
    // }

    // if (race.getArmorClass() != null) {
    //   character.raceBonusArmorClass(race.getArmorClass());
    // }

    character.setCharacterRace(race);

    this.characterRepository.save(character);

    return new CharacterDTO(
      character,
      character.getInventory(),
      character.getAttacks(),
      character.getClassPcArray()
    );
  }
}
