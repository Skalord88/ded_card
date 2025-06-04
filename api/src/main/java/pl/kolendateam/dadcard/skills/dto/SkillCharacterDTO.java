package pl.kolendateam.dadcard.skills.dto;

import pl.kolendateam.dadcard.skills.entity.SkillCharacter;

public class SkillCharacterDTO {

  public SkillDTO skill;
  public StudyDTO study;
  public double rank;

  public SkillCharacterDTO(SkillCharacter skillChar) {
    this.skill =
      skillChar.getSkill() != null ? new SkillDTO(skillChar.getSkill()) : null;
    this.study =
      skillChar.getStudy() != null ? new StudyDTO(skillChar.getStudy()) : null;
    this.rank = skillChar.getRank();
  }
}
