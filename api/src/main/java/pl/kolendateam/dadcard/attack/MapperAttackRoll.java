package pl.kolendateam.dadcard.attack;

import pl.kolendateam.dadcard.attack.dto.AttackRollDTO;
import pl.kolendateam.dadcard.attack.entity.AttackRoll;

public class MapperAttackRoll {

  public static AttackRollDTO toAttackRollDTO(AttackRoll attack) {
    return new AttackRollDTO(attack);
  }
}
