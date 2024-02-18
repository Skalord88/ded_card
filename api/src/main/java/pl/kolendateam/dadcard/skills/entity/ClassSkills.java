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
  Set<ClassStudy> fieldOfStudy;
  boolean classSkill;
  double skillRank;
  int skillDifferentBonus;
  AbilityEnum skillAbility;

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
    boolean check = true;
    for (ClassStudy study : this.fieldOfStudy) {
      if (study.getId() == st.getId()) {
        check = false;
        break;
      }
    }
    if (check) {
      ClassStudy classStudy = new ClassStudy(st, this.nameSkill);
      this.fieldOfStudy.add(classStudy);
    }
  }
}
