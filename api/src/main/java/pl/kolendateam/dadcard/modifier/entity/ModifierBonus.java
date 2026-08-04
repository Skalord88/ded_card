package pl.kolendateam.dadcard.modifier.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.dto.ModifierBonusDTO;

// @Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ModifierBonus implements Serializable {

  @Enumerated(EnumType.STRING)
  ModifierEnum modifier;

  @Enumerated(EnumType.STRING)
  ModifierEnum modifierType;

  Integer bonus;

  @Enumerated(EnumType.STRING)
  ModifierEnum[] target;

  public ModifierBonus(ModifierBonusDTO mod) {
    this.modifier = mod.modifier != null ? mod.modifier : null;
    this.modifierType = mod.modifierType != null ? mod.modifierType : null;
    this.bonus = mod.bonus != null ? mod.bonus : null;
    this.target = mod.target != null ? mod.target : null;
  }
}
