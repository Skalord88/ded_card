package pl.kolendateam.dadcard.modifier.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ModifierBonusDTO {

  public ModifierEnum modifier;
  public Integer bonus;
  public ModifierEnum modifierType;

  // public ModifierEnum[] selected;
  public ModifierEnum[] target;

  public ModifierBonusDTO(ModifierBonus mod) {
    this.modifier = mod.getModifier() != null ? mod.getModifier() : null;
    this.bonus = mod.getBonus() != null ? mod.getBonus() : null;
    this.modifierType =
      mod.getModifierType() != null ? mod.getModifierType() : null;
    // this.selected = mod.getSelected();
    this.target = mod.getTarget() != null ? mod.getTarget() : null;
  }
}
