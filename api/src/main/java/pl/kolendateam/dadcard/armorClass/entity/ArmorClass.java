package pl.kolendateam.dadcard.armorClass.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@Getter
@Setter
@NoArgsConstructor
public class ArmorClass implements Serializable {

  int bonus;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierType;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target;

  String special;

  public ArmorClass(ArmorClassDTO armorClass) {
    this.bonus = armorClass.bonus;
    this.modifierType = armorClass.modifierType;
    this.target = armorClass.target;
    this.special = armorClass.special;
  }
}
