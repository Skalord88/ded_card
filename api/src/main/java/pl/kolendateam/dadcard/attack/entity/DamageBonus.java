package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.attack.dto.DamageBonusDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DamageBonus implements Serializable {

  public ModifierEnum modifierBonus; // ex. SIZE, STR, DEX, BAB, FEAT, CLASS, SPELL, OTHER

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] target;

  @JdbcTypeCode(SqlTypes.JSON)
  ModifierEnum[] type; // ex. MELEE, DISTANCE, GRAPPLE, BULL_RUSH, DISARM, OVERRUN

  Integer bonus;

  public DamageBonus(DamageBonusDTO dmg) {
    this.modifierBonus = dmg.modifierBonus != null ? dmg.modifierBonus : null;
    this.bonus = dmg.bonus;
    this.target = dmg.target != null ? dmg.target : null;
    this.type = dmg.type != null ? dmg.type : null;
  }
}
