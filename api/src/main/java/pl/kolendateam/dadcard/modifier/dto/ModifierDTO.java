package pl.kolendateam.dadcard.modifier.dto;

import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

public class ModifierDTO {

  public ModifierEnum modifier;
  public int bonus;
  public ModifierEnum[] targets;

  public ModifierDTO(ModifierBonus mod) {
    this.modifier = mod.getModifier();
    this.bonus = mod.getBonus();
    this.targets = mod.getTargets();
  }
}
