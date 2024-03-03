package pl.kolendateam.dadcard.feats;

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
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.repository.FeatsRepository;

@CrossOrigin
@RestController
@RequestMapping("feats")
public class FeatsController {

  FeatsRepository featsRepository;
  CharacterRepository characterRepository;

  @Autowired
  public FeatsController(
    FeatsRepository featsRepository,
    CharacterRepository characterRepository
  ) {
    this.featsRepository = featsRepository;
    this.characterRepository = characterRepository;
  }

  @GetMapping("")
  public List<FeatsDTO> showFeatsList() {
    List<Feats> featsList = this.featsRepository.findAll();

    return MapperFeatsDTO.toFeatsDTO(featsList);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setFeatsCharacter(
    @PathVariable short id,
    @RequestBody ArrayList<FeatsDTO> featsDTOList
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    List<Integer> checkListFeat = new ArrayList<>();

    for (FeatsDTO featDTO : featsDTOList) {
      int idDTO = featDTO.id;
      checkListFeat.add(idDTO);
    }

    List<Feats> featsFromDB = this.featsRepository.findAllByIdIn(checkListFeat);

    featsFromDB.forEach(feat -> {
      boolean buyed = character.buyFeat(feat);

      if (buyed) {
        if (feat.getSkills() != null) {
          character.addSkill(feat.getSkills());
        }

        if (feat.getSpeed() != null) {
          character.addSpeed(feat.getSpeed());
        }

        if (feat.getSpecialAttacks() != null) {
          character.addSpecialAttacks(feat.getSpecialAttacks());
        }
      }
    });
    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }

  @PostMapping(value = "remove/{id}", consumes = { "application/json" })
  public CharacterDTO delFeatsCharacter(
    @PathVariable short id,
    @RequestBody FeatsDTO featDTO
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    int featIndex = character.getFeatIndex(featDTO.id);

    if (featIndex != -1) {
      character.deleteFeatFromList(featIndex);
    }

    this.characterRepository.save(character);

    return new CharacterDTO(character);
  }
}
