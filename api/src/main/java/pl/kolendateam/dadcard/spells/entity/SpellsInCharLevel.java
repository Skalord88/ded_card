package pl.kolendateam.dadcard.spells.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

// @Getter
// @Setter
// @NoArgsConstructor
// @Entity
public class SpellsInCharLevel implements Serializable {
  // @Id
  // @GeneratedValue(strategy = GenerationType.IDENTITY)
  // int id;

  // EnumClass caster;

  // @ManyToMany(cascade = CascadeType.MERGE)
  // @JoinTable(
  //   name = "char_spells_known",
  //   joinColumns = @JoinColumn(name = "char_spells_known_id"),
  //   inverseJoinColumns = @JoinColumn(name = "spells_id")
  // )
  // HashMap<Integer, ArrayList<Spells>> spells;

  // public SpellsInCharLevel(EnumClass caster) {
  //   this.caster = caster;
  //   this.spells = new HashMap<>();
  // }
}
