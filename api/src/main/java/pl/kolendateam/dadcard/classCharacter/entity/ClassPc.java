package pl.kolendateam.dadcard.classCharacter.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class ClassPc implements Serializable {

  short id;

  @NonNull
  @Enumerated(EnumType.STRING)
  EnumClass name;

  byte level;
  byte hitDice;
  String savingThrow;
  double classBab;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsPerDay;

  @Enumerated(EnumType.STRING)
  SpellsEnum spellsKnown;

  @Enumerated(EnumType.STRING)
  SpellsEnum spells_domain;

  public void incrementLevel() {
    this.level++;
  }

  public void decrementLevel() {
    this.level--;
  }

  public int findIndexInArrayById(ArrayList<ClassPc> classPcList) {
    for (int i = 0; i < classPcList.size(); i++) {
      if (this.id == classPcList.get(i).getId()) {
        return i;
      }
    }
    return -1;
  }

  public int findLevelInArrayById(ArrayList<ClassPc> classPcList, short id) {
    for (ClassPc clPc : classPcList) {
      if (this.id == id) {
        return clPc.getLevel();
      }
    }
    return -1;
  }
}
