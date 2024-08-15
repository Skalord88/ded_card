package pl.kolendateam.dadcard.classCharacter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.List;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class ClassPc implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  int level;

  @ManyToOne
  @JoinColumn(name = "character_id", referencedColumnName = "id")
  Character character;

  @ManyToOne
  @JoinColumn(name = "class_character_id", referencedColumnName = "id")
  ClassCharacter classCharacter;

  // @ManyToMany
  // @JoinTable(
  //   name = "class_pc_array",
  //   joinColumns = @JoinColumn(name = "class_character_id"),
  //   inverseJoinColumns = @JoinColumn(name = "character_id")
  // )
  // ClassCharacter classCharacter;

  // @OneToOne(cascade = CascadeType.PERSIST)
  // @JoinColumn(name = "character_id", referencedColumnName = "id")
  // Character character;

  // short id;

  // @NonNull
  // @Enumerated(EnumType.STRING)
  // EnumClass name;
  // byte hitDice;
  // String savingThrow;
  // double classBab;

  // @Enumerated(EnumType.STRING)
  // SpellsEnum spellsPerDay;

  // @Enumerated(EnumType.STRING)
  // SpellsEnum spellsKnown;

  // @Enumerated(EnumType.STRING)
  // SpellsEnum spells_domain;

  public ClassPc(int lv, ClassCharacter classPg) {
    this.level = lv;
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
      if (
        this.classCharacter.getId() == classPcList.get(i).classCharacter.getId()
      ) {
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
}
