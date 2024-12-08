package pl.kolendateam.dadcard.skills.dto;

import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.entity.PrerequisiteSkills;

public class PrerequisiteSkillDTO {

  public SkillDTO skill;
  public StudyDTO study;
  public int rank;

  public PrerequisiteSkillDTO(PrerequisiteSkills pre) {
    this.skill = MapperSkillToDTO.toSkillDTO(pre.getSkill());
    this.study = MapperSkillToDTO.toStudyDTO(pre.getStudy());
    this.rank = pre.getRank();
  }
}
