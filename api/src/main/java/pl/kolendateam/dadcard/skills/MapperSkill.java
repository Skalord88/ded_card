package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.skills.dto.PrerequisiteSkillDTO;
import pl.kolendateam.dadcard.skills.dto.SkillCharacterDTO;
import pl.kolendateam.dadcard.skills.dto.SkillDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.PrerequisiteSkills;
import pl.kolendateam.dadcard.skills.entity.Skill;
import pl.kolendateam.dadcard.skills.entity.SkillCharacter;
import pl.kolendateam.dadcard.skills.entity.Study;

public class MapperSkill {

  public static SkillDTO toSkillDTO(Skill skill) {
    return skill != null ? new SkillDTO(skill) : null;
  }

  public static StudyDTO toStudyDTO(Study study) {
    return study != null ? new StudyDTO(study) : null;
  }

  public static SkillCharacterDTO toSkillCharacterDTO(
    SkillCharacter skillCharacter
  ) {
    return skillCharacter != null
      ? new SkillCharacterDTO(skillCharacter)
      : null;
  }

  public static Set<SkillDTO> toSkillSetDTO(Set<Skill> listSkills) {
    Set<SkillDTO> listSkillDTO = new HashSet<>();

    if (listSkills != null) {
      listSkills.forEach(skill -> {
        listSkillDTO.add(new SkillDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static List<SkillDTO> toSkillListDTO(List<Skill> listSkills) {
    List<SkillDTO> listSkillDTO = new ArrayList<>();

    if (listSkills != null) {
      listSkills.forEach(skill -> {
        listSkillDTO.add(new SkillDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static Set<StudyDTO> toStudySetDTO(Set<Study> listSkills) {
    Set<StudyDTO> listSkillDTO = new HashSet<>();

    if (listSkills != null) {
      listSkills.forEach(skill -> {
        listSkillDTO.add(new StudyDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static List<StudyDTO> toStudyListDTO(List<Study> listSkills) {
    List<StudyDTO> listSkillDTO = new ArrayList<>();

    if (listSkills != null) {
      listSkills.forEach(skill -> {
        listSkillDTO.add(new StudyDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static Set<SkillCharacterDTO> toSkillCharacterSetDTO(
    Set<SkillCharacter> listSkillCharacter
  ) {
    Set<SkillCharacterDTO> listSkillDTO = new HashSet<>();

    if (listSkillCharacter != null) {
      listSkillCharacter.forEach(skill -> {
        listSkillDTO.add(new SkillCharacterDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static List<SkillCharacterDTO> toSkillCharacterListDTO(
    List<SkillCharacter> listSkillCharacter
  ) {
    List<SkillCharacterDTO> listSkillDTO = new ArrayList<>();

    if (listSkillCharacter != null) {
      listSkillCharacter.forEach(skill -> {
        listSkillDTO.add(new SkillCharacterDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static List<PrerequisiteSkillDTO> toPrerequisiteSkillDTO(
    List<PrerequisiteSkills> listSkillCharacter
  ) {
    List<PrerequisiteSkillDTO> listSkillDTO = new ArrayList<>();

    if (listSkillCharacter != null) {
      listSkillCharacter.forEach(skill -> {
        listSkillDTO.add(new PrerequisiteSkillDTO(skill));
      });
    }

    return listSkillDTO;
  }

  public static List<PrerequisiteSkills> toPrerequisiteSkillsStudyList(
    List<PrerequisiteSkillDTO> skillStudyDTO
  ) {
    List<PrerequisiteSkills> listOfSkills = new ArrayList<>();
    if (skillStudyDTO != null) {
      skillStudyDTO.forEach(skillDTO -> {
        listOfSkills.add(new PrerequisiteSkills(skillDTO));
      });
    }
    return listOfSkills;
  }
}
