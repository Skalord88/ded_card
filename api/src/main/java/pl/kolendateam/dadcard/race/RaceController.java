package pl.kolendateam.dadcard.race;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
import pl.kolendateam.dadcard.characterCard.dto.CreateCharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.race.dto.AddRegionDTO;
import pl.kolendateam.dadcard.race.dto.ArchetypeDTO;
import pl.kolendateam.dadcard.race.dto.DeityDTO;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.RacialRegionDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Archetype;
import pl.kolendateam.dadcard.race.entity.Deity;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.RacialRegion;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.race.repository.ArchetypeRepository;
import pl.kolendateam.dadcard.race.repository.DeityRepository;
import pl.kolendateam.dadcard.race.repository.RaceRepository;
import pl.kolendateam.dadcard.race.repository.RacialRegionRepository;
import pl.kolendateam.dadcard.race.repository.RegionRepository;
import pl.kolendateam.dadcard.race.repository.SubRaceRepository;
import pl.kolendateam.dadcard.spells.repository.DomaninRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

@CrossOrigin
@RestController
@RequestMapping("race")
public class RaceController {

  EntityManager entityManager;
  RaceRepository raceRepository;
  SubRaceRepository subRaceRepository;
  RegionRepository regionRepository;
  ArchetypeRepository archetypeRepository;
  CharacterRepository characterRepository;
  DeityRepository deityRepository;
  SpellsRepository spellsRepository;
  RacialRegionRepository racialRegionRepository;
  DomaninRepository domainRepository;

  @Autowired
  RaceController(
    EntityManager entityManager,
    RaceRepository raceRepository,
    CharacterRepository characterRepository,
    SubRaceRepository subRaceRepository,
    ArchetypeRepository archetypeRepository,
    DeityRepository deityRepository,
    SpellsRepository spellsRepository,
    RacialRegionRepository racialRegionRepository,
    RegionRepository regionRepository,
    DomaninRepository domainRepository
  ) {
    this.entityManager = entityManager;
    this.raceRepository = raceRepository;
    this.characterRepository = characterRepository;
    this.subRaceRepository = subRaceRepository;
    this.archetypeRepository = archetypeRepository;
    this.deityRepository = deityRepository;
    this.spellsRepository = spellsRepository;
    this.racialRegionRepository = racialRegionRepository;
    this.regionRepository = regionRepository;
    this.domainRepository = domainRepository;
  }

  @GetMapping("")
  public ArrayList<RaceDTO> getAll() {
    List<Race> races = this.raceRepository.findAll();

    return MaperListRaceToDTO.toListRaceDTO(races);
  }

  @GetMapping("sub")
  public ArrayList<SubRaceDTO> getAllSub() {
    List<SubRace> subRaces = this.subRaceRepository.findAll();

    return MaperListRaceToDTO.toListSubRaceDTO(subRaces);
  }

  @GetMapping("archetype")
  public ArrayList<ArchetypeDTO> getAllArche() {
    List<Archetype> archetypes = this.archetypeRepository.findAll();

    return MaperListRaceToDTO.toListArchetypeDTO(archetypes);
  }

  @GetMapping("deity")
  public Set<DeityDTO> getAllDeities() {
    List<Deity> deities = this.deityRepository.findAll();

    return MapperRaceToDTO.toDeityDTOSet(deities, spellsRepository);
  }

  @GetMapping("region")
  public Set<RacialRegionDTO> getAllRacialRegions() {
    List<RacialRegion> regions = this.racialRegionRepository.findAll();

    return MapperRaceToDTO.toRacialRegionDTOSet(regions, spellsRepository);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CreateCharacterDTO setSubRaceToCharacter(
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

    Character character = characterOpt.get();
    SubRace race = raceOpt.get();

    character.setCharacterRace(race);

    this.characterRepository.save(character);

    return new CreateCharacterDTO(character);
  }

  @GetMapping("ping")
  public String ping() {
    return "pong";
  }

  @PostMapping(value = "{id}/addregion", consumes = { "application/json" })
  public CreateCharacterDTO setRegionToCharacter(
    @PathVariable int id,
    @RequestBody AddRegionDTO region
  ) {
    System.out.println("Received AddRegionDTO: " + region);

    Character character = characterRepository
      .findById(region.idCharacter)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Character Not Found")
      );

    Deity deity = deityRepository
      .findById(region.idDeity)
      .orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Deity Not Found")
      );

    character.setCharacterRegion(entityManager, region, domainRepository);
    this.characterRepository.save(character);

    return new CreateCharacterDTO(character);
  }
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
