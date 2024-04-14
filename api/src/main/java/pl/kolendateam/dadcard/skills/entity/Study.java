package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
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
@Entity
public class Study implements Serializable {

  @Id
  short id;

  @Nonnull
  String studyName;

  @Nonnull
  short idSkill;

  public Study(short lastId, StudyDTO newStudy) {
    this.id = lastId;
    this.studyName = newStudy.study;
    this.idSkill = newStudy.idSkill;
  }
}
