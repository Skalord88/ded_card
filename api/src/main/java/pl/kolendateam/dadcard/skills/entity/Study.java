package pl.kolendateam.dadcard.skills.entity;

import io.micrometer.common.lang.Nullable;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.io.Serializable;
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
  // @GeneratedValue(strategy = GenerationType.IDENTITY)
  short id;

  @Nonnull
  String studyName;

  @Nonnull
  short idSkill;

  // int rank;

  public Study(short lastId, StudyDTO newStudy) {
    this.id = lastId;
    this.studyName = newStudy.study;
    this.idSkill = newStudy.idSkill;
  }
  // public Study(short newId, String newStudy, short newIdSkill, int newRank) {
  //   this.id = newId;
  //   this.studyName = newStudy;
  //   this.idSkill = newIdSkill;
  //   this.rank = newRank;
  // }
}
