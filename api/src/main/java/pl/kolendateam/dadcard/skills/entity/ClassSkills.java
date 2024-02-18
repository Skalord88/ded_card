package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@Getter
@Setter
@NoArgsConstructor
public class ClassSkills implements Serializable {

  short idSkill;
  String nameSkill;
  Set<Study> fieldOfStudy;
  boolean classSkill;
  double skillRank;
  int skillDifferentBonus;
  AbilityEnum skillAbility;

  // public void addStudyMapToSkill(Study studyOfClass) {
  //   if (studyOfClass.getRank() == null) {
  //     studyOfClass.setRank(0);
  //   }
  //   this.fieldOfStudy.forEach(study -> {
  //       if (studyOfClass.getId() != study.getId()) {
  //         this.fieldOfStudy.add(studyOfClass);
  //       }
  //     });
  // }

  public void removeStudyFromKnowledge(int idToRemove) {
    this.fieldOfStudy.forEach(study -> {
        if (study.id == idToRemove) {
          fieldOfStudy.remove(study);
        }
      });
  }

  public void zeroStudyRank() {
    this.fieldOfStudy.forEach(study -> {
        study.setRank(0);
      });
  }

  public void addStudyToFieldOfStudy(Study st) {
    if (this.fieldOfStudy.isEmpty()) {
      st.rank = 0;
      this.fieldOfStudy.add(st);
    } else {
      boolean check = false;
      for (Study study : this.fieldOfStudy) {
        if (study.id != st.id) {
          st.rank = 0;
          check = true;
          break;
        }
        if (check) {
          this.fieldOfStudy.add(st);
          System.out.println("study add to character" + this.getNameSkill());
        } else {
          System.out.println("study already present");
        }
      }
    }
  }
}
