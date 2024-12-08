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

public class MapperSkillToDTO {

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
  //   skills.forEach(sk -> {
  //     skillsDTO.add(new SkillsDTO(sk.getId(), sk.getName(), sk.getAbility()));
  //   });
  //   return skillsDTO;
  // }

  // public static SkillsDTO toOneSkillDTO(ClassSkills skill) {
  //   return new SkillsDTO(
  //     skill.getIdSkill(),
  //     skill.getNameSkill(),
  //     skill.getSkillAbility(),
  //     skill.getSkillBonus(),
  //     skill.getFieldOfStudy()
  //   );
  // }

  // public static ArrayList<SkillsDTO> toSkillsDTO(
  //   ArrayList<ClassSkills> skillList,
  //   Abilitys abilitys
  // ) {
  //   ArrayList<SkillsDTO> skillListDTO = new ArrayList<>();

  //   for (ClassSkills skill : skillList) {
  //     SkillsDTO skillDTO = new SkillsDTO();
  //     skillDTO.idSkill = skill.getIdSkill();
  //     skillDTO.nameSkill = skill.getNameSkill();
  //     if (skill.getFieldOfStudy() == null) {
  //       skillDTO.fieldOfStudy = new HashSet<>();
  //     } else {
  //       skillDTO.fieldOfStudy =
  //         MapperStudyToDTO.toStudyListDTO(skill.getFieldOfStudy());
  //     }
  //     skillDTO.classSkill = skill.isClassSkill();
  //     skillDTO.skillRank = skill.getSkillRank();
  //     skillDTO.skillAbility = skill.getSkillAbility();

  //     skillDTO.skillBonus = skill.getSkillBonus();

  //     skillListDTO.add(skillDTO);
  //   }

  //   return skillListDTO;
  // }

  // public static ArrayList<RaceSkillsDTO> toRaceSkillsDTO(
  //   List<ClassSkills> skillList
  // ) {
  //   ArrayList<RaceSkillsDTO> skillListDTO = new ArrayList<>();
  //   for (ClassSkills skill : skillList) {
  //     RaceSkillsDTO skillDTO = new RaceSkillsDTO();
  //     skillDTO.nameSkill = skill.getNameSkill();
  //     skillDTO.skillRank = (int) skill.getSkillRank();

  //     skillListDTO.add(skillDTO);
  //   }

  //   return skillListDTO;
  // }

  // public static List<StudyDTO> toStudyDTO(
  //   List<Study> listStudy,
  //   List<Skill> listSkills
  // ) {
  //   List<StudyDTO> studyListDTO = new ArrayList<>();

  //   for (Study study : listStudy) {
  //     for (Skill skill : listSkills) {
  //       if (study.getIdSkill() == skill.getId()) {
  //         StudyDTO studyDTO = new StudyDTO(study, skill);

  //         studyListDTO.add(studyDTO);
  //       }
  //     }
  //   }
  //   return studyListDTO;
  // }

  // public static ArrayList<SkillsDTO> toSkillsListDTO(
  //   ArrayList<ClassSkills> classSkills
  // ) {
  //   ArrayList<SkillsDTO> skillsListDTO = new ArrayList<>();

  //   if (classSkills != null) {
  //     classSkills.forEach(skill -> {
  //       skillsListDTO.add(
  //         new SkillsDTO(
  //           skill.getIdSkill(),
  //           skill.getNameSkill(),
  //           skill.getSkillAbility(),
  //           skill.getSkillRank(),
  //           skill.getFieldOfStudy()
  //         )
  //       );
  //     });
  //   }
  //   return skillsListDTO;
  // }

  // public static List<SkillsDTO> toSkillsNameDTO(List<Skill> listSkills) {
  //   List<SkillsDTO> skillsNameListDTO = new ArrayList<>();
  //   if (listSkills != null) {
  //     listSkills.forEach(skill -> {
  //       SkillsDTO skillDTO = new SkillsDTO(
  //         skill.getId(),
  //         skill.getName(),
  //         skill.getAbility()
  //       );
  //       skillsNameListDTO.add(skillDTO);
  //     });
  //   }
  //   return skillsNameListDTO;
  // }

  // public static List<SkillsDTO> toListOfSkillsDTO(Set<Skill> skills) {
  //   List<SkillsDTO> skillsDTO = new ArrayList<>();

  //   skills.forEach(sk -> {
  //     skillsDTO.add(new SkillsDTO(sk.getId(), sk.getName(), sk.getAbility()));
  //   });
  //   return skillsDTO;
  // }
  // public static List<SkillsDTO> toSkillsCharacterListDTO(
  //   List<SkillCharacter> skillsCharacter
  // ) {
  //   // TODO Auto-generated method stub
  //   throw new UnsupportedOperationException(
  //     "Unimplemented method 'toSkillsCharacterListDTO'"
  //   );
  // }
}
