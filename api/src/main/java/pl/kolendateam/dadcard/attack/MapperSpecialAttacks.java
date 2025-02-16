package pl.kolendateam.dadcard.attack;

import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

public class MapperSpecialAttacks {

  public static SpecialAttacksDTO toSpecialAttacksDTO(
    SpecialAttacks specialAttacks
  ) {
    return new SpecialAttacksDTO(specialAttacks);
  }

  public static SpecialAttacks toSpecialAttacks(
    SpecialAttacksDTO specialAttacks
  ) {
    return new SpecialAttacks(specialAttacks);
  }
}
