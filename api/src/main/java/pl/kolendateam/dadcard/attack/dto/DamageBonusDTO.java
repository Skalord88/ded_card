package pl.kolendateam.dadcard.attack.dto;

import pl.kolendateam.dadcard.attack.entity.DamageBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

public class DamageBonusDTO {

  public Integer bonus;
  public ModifierEnum[] target;

  public DamageBonusDTO(DamageBonus dmg) {
    this.bonus = dmg.getBonus();
    this.target = dmg.getTarget() != null ? dmg.getTarget() : null;
  }
}
