package pl.kolendateam.dadcard.skills;

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
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;
import pl.kolendateam.dadcard.skills.repository.StudyRepository;

@RestController
@CrossOrigin
@RequestMapping("skills")
public class SkillsController {

  CharacterRepository characterRepository;
  SkillsRepository skillsRepository;
  StudyRepository studyRepository;

  @Autowired
  public SkillsController(
    CharacterRepository characterRepository,
    SkillsRepository skillsRepository,
    StudyRepository studyRepository
  ) {
    this.characterRepository = characterRepository;
    this.skillsRepository = skillsRepository;
    this.studyRepository = studyRepository;
  }

  @GetMapping("/list")
  public List<SkillsDTO> getSkillsList() {
    List<Skills> listSkills = skillsRepository.findAll();

    return MapperSkillsToDTO.toSkillsNameDTO(listSkills);
  }

  @GetMapping("/studylist")
  public List<StudyDTO> getStudyList() {
    List<Study> listStudy = studyRepository.findAll();
    List<Skills> listSkills = skillsRepository.findAll();

    return MapperSkillsToDTO.toStudyDTO(listStudy, listSkills);
  }

  @PostMapping(value = "{id}", consumes = { "application/json" })
  public CharacterDTO buyCharacterSkill(
    @PathVariable short id,
    @RequestBody ArrayList<SkillToAddDTO> skillsToAdd
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.buySkills(skillsToAdd);

    this.characterRepository.save(character);
    return new CharacterDTO(character);
  }

  @PostMapping(value = "study/{id}", consumes = { "application/json" })
  public CharacterDTO addStudyToSkill(
    @PathVariable short id,
    @RequestBody ArrayList<StudyDTO> studyToAdd
  ) {
    Optional<Character> characterOpt = this.characterRepository.findById(id);

    if (!characterOpt.isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.NOT_FOUND,
        "Character Not Found"
      );
    }

    Character character = characterOpt.get();

    character.addStudy(studyToAdd);

    this.characterRepository.save(character);
    return new CharacterDTO(character);
  }
}
