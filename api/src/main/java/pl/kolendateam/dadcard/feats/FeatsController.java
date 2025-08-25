package pl.kolendateam.dadcard.feats;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
import pl.kolendateam.dadcard.feats.dto.ClassFeatDTO;
import pl.kolendateam.dadcard.feats.dto.FeatDTO;
import pl.kolendateam.dadcard.feats.dto.FeatPcDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeat;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.feats.repository.ClassFeatRepository;
import pl.kolendateam.dadcard.feats.repository.FeatPcRepository;
import pl.kolendateam.dadcard.feats.repository.FeatRepository;
import pl.kolendateam.dadcard.feats.repository.PrerequisiteRepository;

@CrossOrigin
@RestController
@RequestMapping("feats")
public class FeatsController {

  @PersistenceContext
  EntityManager entityManager;

  FeatRepository featsRepository;
  CharacterRepository characterRepository;
  PrerequisiteRepository prerequisiteRepository;
  FeatPcRepository featsPcRepository;
  ClassFeatRepository classFeatsRepository;

  @Autowired
  public FeatsController(
    FeatRepository featsRepository,
    PrerequisiteRepository prerequisiteRepository,
    CharacterRepository characterRepository,
    FeatPcRepository featsPcRepository,
    ClassFeatRepository classFeatsRepository
  ) {
    this.featsRepository = featsRepository;
    this.prerequisiteRepository = prerequisiteRepository;
    this.characterRepository = characterRepository;
    this.featsPcRepository = featsPcRepository;
    this.classFeatsRepository = classFeatsRepository;
  }

  @GetMapping("")
  public List<FeatDTO> showFeatsList() {
    List<Feat> featsList = this.featsRepository.findAll();

    return MapperFeats.toFeatsDTO(featsList);
  }

  @GetMapping("classFeatsList")
  public List<ClassFeatDTO> showFeatsClassList() {
    List<ClassFeat> featsList = this.classFeatsRepository.findAll();

    return MapperFeats.toClassFeatsDTO(featsList);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setFeatsCharacter(
    @PathVariable int id,
    @RequestBody ArrayList<FeatPcDTO> featsDTOList
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.addFeatsToCharacter(id, featsDTOList, entityManager);

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }
}
