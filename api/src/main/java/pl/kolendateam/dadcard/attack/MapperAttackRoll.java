package pl.kolendateam.dadcard.attack;

import pl.kolendateam.dadcard.attack.dto.AttackRollDTO;
import pl.kolendateam.dadcard.attack.dto.DamageBonusDTO;
import pl.kolendateam.dadcard.attack.entity.AttackRoll;
import pl.kolendateam.dadcard.attack.entity.DamageBonus;

public class MapperAttackRoll {

  public static AttackRollDTO[] toAttackRollDTO(AttackRoll[] attack) {
    if (attack == null || attack.length == 0) return null;
    AttackRollDTO[] attackDTOs = new AttackRollDTO[attack.length];
    for (int i = 0; i < attack.length; i++) {
      attackDTOs[i] = new AttackRollDTO(attack[i]);
    }
    return attackDTOs;
  }

  public static DamageBonusDTO[] toDamageBonusDTO(DamageBonus[] dmg) {
    if (dmg == null || dmg.length == 0) return null;
    DamageBonusDTO[] dmgDTOs = new DamageBonusDTO[dmg.length];
    for (int i = 0; i < dmg.length; i++) {
      dmgDTOs[i] = new DamageBonusDTO(dmg[i]);
    }
    return dmgDTOs;
  }

  public static AttackRoll[] toAttackRoll(AttackRollDTO[] attackDTO) {
    if (attackDTO == null) return null;
    AttackRoll[] attackRolls = new AttackRoll[attackDTO.length];
    for (int i = 0; i < attackDTO.length; i++) {
      attackRolls[i] = new AttackRoll(attackDTO[i]);
    }
    return attackRolls;
  }

  public static DamageBonus[] toDamageBonus(DamageBonusDTO[] damageBonus) {
    if (damageBonus == null) return null;
    DamageBonus[] damageBonuses = new DamageBonus[damageBonus.length];
    for (int i = 0; i < damageBonus.length; i++) {
      damageBonuses[i] = new DamageBonus(damageBonus[i]);
    }
    return damageBonuses;
  }
}
