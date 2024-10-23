package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.skills.dto.RaceSkillsDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;

public class MapperSkillsToDTO {

  public static SkillsDTO toOneSkillDTO(ClassSkills skill) {
    return new SkillsDTO(
      skill.getIdSkill(),
      skill.getNameSkill(),
      skill.getSkillAbility(),
      skill.getSkillBonus(),
      skill.getFieldOfStudy()
    );
  }

  public static ArrayList<SkillsDTO> toSkillsDTO(
    ArrayList<ClassSkills> skillList,
    Abilitys abilitys
  ) {
    ArrayList<SkillsDTO> skillListDTO = new ArrayList<>();

    for (ClassSkills skill : skillList) {
      SkillsDTO skillDTO = new SkillsDTO();
      skillDTO.idSkill = skill.getIdSkill();
      skillDTO.nameSkill = skill.getNameSkill();
      if (skill.getFieldOfStudy() == null) {
        skillDTO.fieldOfStudy = new HashSet<>();
      } else {
        skillDTO.fieldOfStudy =
          MapperStudyToDTO.toStudyListDTO(skill.getFieldOfStudy());
      }
      skillDTO.classSkill = skill.isClassSkill();
      skillDTO.skillRank = skill.getSkillRank();
      skillDTO.skillAbility = skill.getSkillAbility();

      skillDTO.skillBonus = skill.getSkillBonus();

      skillListDTO.add(skillDTO);
    }

    return skillListDTO;
  }

  public static ArrayList<RaceSkillsDTO> toRaceSkillsDTO(
    List<ClassSkills> skillList
  ) {
    ArrayList<RaceSkillsDTO> skillListDTO = new ArrayList<>();
    for (ClassSkills skill : skillList) {
      RaceSkillsDTO skillDTO = new RaceSkillsDTO();
      skillDTO.nameSkill = skill.getNameSkill();
      skillDTO.skillRank = (int) skill.getSkillRank();

      skillListDTO.add(skillDTO);
    }

    return skillListDTO;
  }

  public static List<StudyDTO> toStudyDTO(
    List<Study> listStudy,
    List<Skills> listSkills
  ) {
    List<StudyDTO> studyListDTO = new ArrayList<>();

    for (Study study : listStudy) {
      for (Skills skill : listSkills) {
        if (study.getIdSkill() == skill.getId()) {
          StudyDTO studyDTO = new StudyDTO(study, skill);

          studyListDTO.add(studyDTO);
        }
      }
    }
    return studyListDTO;
  }

  public static ArrayList<SkillsDTO> toSkillsListDTO(
    ArrayList<ClassSkills> classSkills
  ) {
    ArrayList<SkillsDTO> skillsListDTO = new ArrayList<>();

    if (classSkills != null) {
      classSkills.forEach(skill -> {
        skillsListDTO.add(
          new SkillsDTO(
            skill.getIdSkill(),
            skill.getNameSkill(),
            skill.getSkillAbility(),
            skill.getSkillRank(),
            skill.getFieldOfStudy()
          )
        );
      });
    }
    return skillsListDTO;
  }

  public static List<SkillsDTO> toSkillsNameDTO(List<Skills> listSkills) {
    List<SkillsDTO> skillsNameListDTO = new ArrayList<>();
    if (listSkills != null) {
      listSkills.forEach(skill -> {
        SkillsDTO skillDTO = new SkillsDTO(skill);
        skillsNameListDTO.add(skillDTO);
      });
    }
    return skillsNameListDTO;
  }
}
