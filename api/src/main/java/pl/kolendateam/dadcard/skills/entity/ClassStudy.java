package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassStudy implements Serializable {

  @Id
  short id;

  @Nonnull
  String studyName;

  @Nonnull
  short idSkill;

  String skillName;

  int rank;

  public ClassStudy(short lastId, StudyDTO newStudy) {
    this.id = lastId;
    this.studyName = newStudy.study;
    this.idSkill = newStudy.idSkill;
    this.skillName = newStudy.skill;
  }

  public ClassStudy(Study st, String skName) {
    this.id = st.getId();
    this.studyName = st.getStudyName();
    this.idSkill = st.getIdSkill();
    this.skillName = skName;
    this.rank = 0;
  }

  public ClassStudy(StudyDTO studyDTO) {
    this.id = studyDTO.idStudy;
    this.studyName = studyDTO.study;
    this.idSkill = studyDTO.idSkill;
    this.rank = studyDTO.rank;
  }

}
