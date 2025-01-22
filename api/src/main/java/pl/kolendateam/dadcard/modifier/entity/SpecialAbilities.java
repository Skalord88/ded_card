package pl.kolendateam.dadcard.modifier.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;

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
}
