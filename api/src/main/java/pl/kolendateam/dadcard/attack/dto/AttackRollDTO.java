package pl.kolendateam.dadcard.attack.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.AttackRoll;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
public class AttackRollDTO {

  public Integer bonus;
  public ModifierEnum[] target;

  public AttackRollDTO(AttackRoll attack) {
    this.bonus = attack.getBonus();
    this.target = attack.getTarget() != null ? attack.getTarget() : null;
  }
}
