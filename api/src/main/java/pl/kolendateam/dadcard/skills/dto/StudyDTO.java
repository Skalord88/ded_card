package pl.kolendateam.dadcard.skills.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;
import pl.kolendateam.dadcard.skills.MapperSkillToDTO;
import pl.kolendateam.dadcard.skills.entity.Study;

@NoArgsConstructor
public class StudyDTO {

  public int id;
  public SkillDTO skill;
  public ModifierEnum studyName;
  public String newStudy;

  public StudyDTO(Study st) {
    this.id = st.getId();
    this.skill = MapperSkillToDTO.toSkillDTO(st.getSkill());
    this.studyName = st.getStudyName();
    this.newStudy = st.getNewStudy();
  }
  // public short idStudy;
  // public short idSkill;
  // public ModifierEnum skill;
  // public String study;
  // public int rank;

  // public StudyDTO(Study study, Skill skill) {
  //   this.idStudy = study.getId();
  //   this.idSkill = skill.getId();
  //   this.study = study.getStudyName();
  //   this.skill = skill.getName();
  // }

  // public StudyDTO(ClassStudy study) {
  //   this.idSkill = study.getIdSkill();
  //   this.idStudy = study.getId();
  //   this.study = study.getStudyName();
  //   this.rank = study.getRank();
  // }
}
