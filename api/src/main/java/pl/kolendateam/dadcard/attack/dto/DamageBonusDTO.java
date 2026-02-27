package pl.kolendateam.dadcard.attack.dto;

import pl.kolendateam.dadcard.attack.entity.DamageBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

public class DamageBonusDTO {

  public ModifierEnum modifierBonus; // ex. SIZE, STR, DEX, BAB, FEAT, CLASS, SPELL, OTHER
  public Integer bonus;
  public ModifierEnum[] target;
  public ModifierEnum[] type;

  public DamageBonusDTO(DamageBonus dmg) {
    this.modifierBonus = dmg.getModifierBonus();
    this.bonus = dmg.getBonus();
    this.target = dmg.getTarget() != null ? dmg.getTarget() : null;
    this.type = dmg.getType() != null ? dmg.getType() : null;
  }
}
