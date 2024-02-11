package pl.kolendateam.dadcard.skills.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.entity.Study;

@NoArgsConstructor
public class StudyDTO {

  public short idStudy;
  public short idSkill;
  public String skill;
  public String study;
  public Integer rank;

  public StudyDTO(Study study, Skills skill) {
    this.idStudy = study.getId();
    this.idSkill = skill.getId();
    this.study = study.getStudyName();
    this.skill = skill.getName();
  }

  public StudyDTO(Study study) {
    this.idSkill = study.getIdSkill();
    this.idStudy = study.getId();
    this.study = study.getStudyName();
    this.rank = study.getRank();
  }
}
