package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.dto.DamageBonusDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DamageBonus implements Serializable {

  ModifierEnum[] target;
  Integer bonus;

  public DamageBonus(DamageBonusDTO dmg) {
    this.bonus = dmg.bonus;
    this.target = dmg.target != null ? dmg.target : null;
  }
}
