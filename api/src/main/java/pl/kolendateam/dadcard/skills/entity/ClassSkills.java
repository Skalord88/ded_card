package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;
import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;
import pl.kolendateam.dadcard.skills.dto.StudyDTO;

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

  // da un DTO che arriva da POST, aggiunge uno study nuovo o aggiunge il rank dal
  // DTO
  public void addRankStudy(StudyDTO studyDTO) {

    if (this.fieldOfStudy.size() == 0) {
      ClassStudy newStudy = new ClassStudy(studyDTO);
      this.fieldOfStudy.add(newStudy);
    } else {
      this.fieldOfStudy.forEach(study -> {
        if (study.getId() == studyDTO.idStudy) {
          study.setRank(studyDTO.rank);
        }
      });
    }

  }

  // da un DTO che arriva da POST, aggiunge il rank dalla skillDTO
  public void addRankSkill(double skillRankDTO) {
    this.skillRank = skillRankDTO;
  }
}
