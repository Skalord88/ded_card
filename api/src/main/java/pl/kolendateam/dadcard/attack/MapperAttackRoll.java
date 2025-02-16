package pl.kolendateam.dadcard.attack;

import pl.kolendateam.dadcard.attack.dto.AttackRollDTO;
import pl.kolendateam.dadcard.attack.dto.DamageBonusDTO;
import pl.kolendateam.dadcard.attack.entity.AttackRoll;
import pl.kolendateam.dadcard.attack.entity.DamageBonus;

public class MapperAttackRoll {

  public static AttackRollDTO toAttackRollDTO(AttackRoll attack) {
    if (attack == null) return null;
    return new AttackRollDTO(attack);
  }

  public static DamageBonusDTO toDamageBonusDTO(DamageBonus dmg) {
    if (dmg == null) return null;
    return new DamageBonusDTO(dmg);
  }

  public static AttackRoll toAttackRoll(AttackRollDTO attackDTO) {
    if (attackDTO == null) return null;
    return new AttackRoll(attackDTO);
  }

  public static DamageBonus toDamageBonus(DamageBonusDTO damageBonus) {
    if (damageBonus == null) return null;
    return new DamageBonus(damageBonus);
  }
}
