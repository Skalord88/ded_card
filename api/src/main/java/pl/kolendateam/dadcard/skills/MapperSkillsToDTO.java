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
      // AbilityEnum ability = skill.getSkillAbility();
      // switch (ability) {
      //   case STRENGHT:
      //     skillDTO.skillAbilityBonus = abilitys.bonusStreght(abilitys);
      //     break;
      //   case DEXTERITY:
      //     skillDTO.skillAbilityBonus = abilitys.bonusDextrity(abilitys);
      //     break;
      //   case CONSTITUTION:
      //     skillDTO.skillAbilityBonus = abilitys.bonusConstitution(abilitys);
      //     break;
      //   case INTELLIGENCE:
      //     skillDTO.skillAbilityBonus = abilitys.bonusIntelligence(abilitys);
      //     break;
      //   case WISDOM:
      //     skillDTO.skillAbilityBonus = abilitys.bonusWisdom(abilitys);
      //     break;
      //   case CHARISMA:
      //     skillDTO.skillAbilityBonus = abilitys.bonusCharisma(abilitys);
      //     break;
      // }
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

  public static List<SkillsDTO> toSkillsNameDTO(List<Skills> skills) {
    List<SkillsDTO> skillListDTO = new ArrayList<>();

    for (Skills skill : skills) {
      SkillsDTO skDTO = new SkillsDTO(
        skill.getId(),
        skill.getName(),
        skill.getAbility()
      );
      skillListDTO.add(skDTO);
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
}
