package pl.kolendateam.dadcard.classCharacter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "class_pc")
public class ClassPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  int level;
  boolean firstClass;

  @ManyToOne
  @JoinColumn(name = "class_character_id")
  ClassCharacter classCharacter;

  @ManyToOne
  @JoinColumn(name = "character_card_id")
  Character character;

  public boolean getFirstClass() {
    return this.firstClass;
  }

  public ClassPc(int lv, boolean first, ClassCharacter classPg) {
    this.level = lv;
    this.firstClass = first;
    this.classCharacter = classPg;
  }

  public void incrementLevel() {
    this.level++;
  }

  public void decrementLevel() {
    this.level--;
  }

  public int findIndexInArrayById(List<ClassPc> classPcList) {
    for (int i = 0; i < classPcList.size(); i++) {
      if (this.classCharacter.getId() == classPcList.get(i).getId()) {
        return i;
      }
    }
    return -1;
  }

  public int findLevelInArrayById(List<ClassPc> classPcList, int id) {
    for (ClassPc clPc : classPcList) {
      if (this.classCharacter.getId() == id) {
        return clPc.getLevel();
      }
    }
    return -1;
  }

  public void subtractLevel(int actualLevelAdjustment) {
    this.level -= actualLevelAdjustment;
  }
}
