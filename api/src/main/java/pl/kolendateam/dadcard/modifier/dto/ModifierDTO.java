package pl.kolendateam.dadcard.modifier.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ModifierDTO {

  public ModifierEnum modifier;
  public int bonus;
  public ModifierEnum[] selected;
  public ModifierEnum[] targets;

  public ModifierDTO(ModifierBonus mod) {
    this.modifier = mod.getModifier();
    this.bonus = mod.getBonus();
    this.selected = mod.getSelected();
    this.targets = mod.getTargets();
  }
}
