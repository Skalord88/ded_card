package pl.kolendateam.dadcard.skills.dto;

import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.MapperSkill;
import pl.kolendateam.dadcard.skills.entity.PrerequisiteSkills;

public class PrerequisiteSkillDTO {

  public SkillDTO skill;
  public StudyDTO study;
  public ModifierEnum modifierBonus;
  public int rank;
  public ModifierEnum[] target;

  public PrerequisiteSkillDTO(PrerequisiteSkills pre) {
    this.skill = MapperSkill.toSkillDTO(pre.getSkill());
    this.study = MapperSkill.toStudyDTO(pre.getStudy());
    this.modifierBonus = pre.getModifierBonus();
    this.rank = pre.getRank();
    this.target = pre.getTarget() != null ? pre.getTarget() : null;
  }
}
