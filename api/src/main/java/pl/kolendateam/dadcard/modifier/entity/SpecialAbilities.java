package pl.kolendateam.dadcard.modifier.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.io.Serializable;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.modifier.dto.SpecialAbilitiesDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;

@NoArgsConstructor
@Getter
@Setter
@Entity
@AllArgsConstructor
public class SpecialAbilities implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;
  int specialType;

  @Enumerated(EnumType.STRING)
  ModifierEnum type;

  String attackQualities;

  String description;
  Integer dc;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] dcAbility;

  Integer value;
  String valueText;

  @Enumerated(EnumType.STRING)
  WeaponNumericEnum damageDice;

  Integer damageNumberDice;
  Integer prerequisiteHd; // -11: tra 0 e 11 / 12: da 12 in su
  Integer maxValue; // massimo valore ottenibile
  String target;
  String area;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "special_abilities_spells",
    joinColumns = @JoinColumn(name = "special_abilities_id"),
    inverseJoinColumns = @JoinColumn(name = "spells_id")
  )
  Set<Spells> spells;

  public SpecialAbilities(SpecialAbilitiesDTO sA) {
    this.id = sA.id;
  }
}
