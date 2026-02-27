package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.attack.dto.AttackRollDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AttackRoll implements Serializable {

  ModifierEnum modifierBonus; // ex. SIZE, STR, DEX, BAB, FEAT, CLASS, SPELL, OTHER

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target; // if null, bonus to all attacks, if not null, bonus to each target

  Boolean improved; // true - migliora il bonus

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] type; // ex. MELEE, DISTANCE, GRAPPLE, BULL_RUSH, DISARM, OVERRUN

  Integer bonus;

  public AttackRoll(AttackRollDTO attackDTO) {
    this.modifierBonus =
      attackDTO.modifierBonus != null ? attackDTO.modifierBonus : null;
    this.target = attackDTO.target != null ? attackDTO.target : null;
    this.type = attackDTO.type != null ? attackDTO.type : null;
    this.improved = attackDTO.improved != null ? attackDTO.improved : null;
    this.bonus = attackDTO.bonus != null ? attackDTO.bonus : null;
  }
  // no target, add bonus to all attacks ex. size
  // for each target, pg receive bonus
  // target contain item, check weaponType and item[], add bonus
}
