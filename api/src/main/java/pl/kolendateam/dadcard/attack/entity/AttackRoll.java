package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AttackRoll implements Serializable {

  ModifierEnum[] target;
  Integer bonus;
  // no target, add bonus to all attacks ex. size
  // for each target, pg receive bonus
  // target contain item, check weaponType and item[], add bonus
}
