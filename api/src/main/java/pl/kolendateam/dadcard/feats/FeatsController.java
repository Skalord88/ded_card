package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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
import pl.kolendateam.dadcard.feats.dto.FeatsPcDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.feats.repository.FeatsPcRepository;
import pl.kolendateam.dadcard.feats.repository.FeatsRepository;
import pl.kolendateam.dadcard.feats.repository.PrerequisiteRepository;

@CrossOrigin
@RestController
@RequestMapping("feats")
public class FeatsController {

  FeatsRepository featsRepository;
  CharacterRepository characterRepository;
  PrerequisiteRepository prerequisiteRepository;
  FeatsPcRepository featsPcRepository;

  @Autowired
  public FeatsController(
    FeatsRepository featsRepository,
    PrerequisiteRepository prerequisiteRepository,
    CharacterRepository characterRepository,
    FeatsPcRepository featsPcRepository
  ) {
    this.featsRepository = featsRepository;
    this.prerequisiteRepository = prerequisiteRepository;
    this.characterRepository = characterRepository;
    this.featsPcRepository = featsPcRepository;
  }

  // @GetMapping("special")
  // public SpecialPrerequisiteDTO postSpecialPrerequisite(
  //   @RequestBody SpecialPrerequisiteDTO prer
  // ) {
  //   if (prer.type.equals("feat")) {
  //     Optional<Feats> talentoOpt = featsRepository.findById(prer.id);
  //     if (!talentoOpt.isPresent()) {
  //       throw new ResponseStatusException(
  //         HttpStatus.NOT_FOUND,
  //         "Feat Not Found"
  //       );
  //     }
  //     if (talentoOpt != null) {
  //       Feats talento = talentoOpt.get();
  //       return new SpecialPrerequisiteDTO(null, talento);
  //     }
  //   }
  //   return new SpecialPrerequisiteDTO();
  // }

  @GetMapping("")
  public List<FeatsDTO> showFeatsList() {
    List<Feats> featsList = this.featsRepository.findAll();

    return MapperFeats.toFeatsDTO(featsList);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO setFeatsCharacter(
    @PathVariable int id,
    @RequestBody ArrayList<FeatsPcDTO> featsDTOList
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    // List<Prerequisite> addedPrerequisite =
    character.addFeatsToCharacter(id, featsDTOList);

    this.characterRepository.save(character);

    // this.prerequisiteRepository.saveAllAndFlush(addedPrerequisite);
    // this.featsPcRepository.saveAllAndFlush(character.getFeatsList());

    // List<FeatsPc> checkFeats = featsPcRepository.findAllByCharacterId(id);

    // List<FeatsPc> featsToRemove = checkFeats
    //   .stream()
    //   .filter(feat ->
    //     character.getId() == feat.getCharacter().getId() &&
    //     !character.getFeatsList().contains(feat)
    //   )
    //   .collect(Collectors.toList());

    // this.featsPcRepository.deleteAll(featsToRemove);

    return new CharacterDTO(character);
  }
  // @PostMapping(value = "{id}", consumes = { "application/json" })
  // public CharacterDTO setFeatsCharacter(
  //   @PathVariable int id,
  //   @RequestBody ArrayList<FeatsPcDTO> featsDTOList
  // ) {
  //   Optional<Character> characterOpt = this.characterRepository.findById(id);

  //   if (!characterOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Character Not Found"
  //     );
  //   }

  //   Character character = characterOpt.get();

  //   List<Prerequisite> newPrerequisites = new ArrayList<>();

  //   featsDTOList.forEach(fDTO -> {
  //     Optional<FeatsPc> existingOpt = character
  //       .getFeatsList()
  //       .stream()
  //       .filter(feat ->
  //         feat.getFeat().getId() == fDTO.feat.id &&
  //         feat.getLevel() == fDTO.level
  //       )
  //       .findFirst();

  //     FeatsPc existing;
  //     if (existingOpt.isPresent()) {
  //       existing = existingOpt.get();
  //     } else {
  //       // 🔍 Controlla se il Prerequisite esiste già nel database
  //       Prerequisite prerequisite = null;
  //       if (fDTO.selected != null) {
  //         prerequisite =
  //           prerequisiteRepository.findById(fDTO.selected.id).orElse(null);

  //         // 🔥 Se il prerequisite è nuovo, salvalo prima di assegnarlo
  //         if (prerequisite == null) {
  //           prerequisite = new Prerequisite(fDTO.selected);
  //           prerequisite.setId(null); // Assicura che venga generato un nuovo ID
  //           prerequisite = prerequisiteRepository.saveAndFlush(prerequisite);
  //           newPrerequisites.add(prerequisite);
  //         }
  //       }

  //       // ✅ Crea il nuovo FeatsPc con il Prerequisite corretto
  //       existing = new FeatsPc(id, fDTO.level, fDTO.feat, prerequisite);
  //     }

  //     character.getFeatsList().add(existing);
  //   });

  //   // 🔥 Salva il personaggio con i Feats aggiornati
  //   this.characterRepository.save(character);

  //   return new CharacterDTO(character);
  // }

  // @PostMapping(value = "remove/{id}", consumes = { "application/json" })
  // public CharacterDTO delFeatsCharacter(
  //   @PathVariable int id,
  //   @RequestBody FeatsDTO featDTO
  // ) {
  //   Optional<Character> characterOpt = this.characterRepository.findById(id);

  //   if (!characterOpt.isPresent()) {
  //     throw new ResponseStatusException(
  //       HttpStatus.NOT_FOUND,
  //       "Character Not Found"
  //     );
  //   }

  //   Character character = characterOpt.get();

  // int featIndex = character.getFeatIndex(featDTO.id);

  // if (featIndex != -1) {
  //   character.deleteFeatFromList(featIndex);
  // }

  // this.characterRepository.save(character);

  // return new CharacterDTO(
  //   character
  // ,
  // character.getInventory(),
  // character.getAttacks(),
  // character.getClassPcArray()
  //   );
  // }
}
