package pl.kolendateam.dadcard.attack;

import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

public class MapperSpecialAttacks {

  public static SpecialAttacksDTO toSpecialAttacksDTO(
    SpecialAttacks specialAttacks
  ) {
    SpecialAttacksDTO specialAttacksDTO = new SpecialAttacksDTO(
      // specialAttacks.getId(),
      // specialAttacks.getName(),
      // specialAttacks.getBonus(),
      // specialAttacks.getTarget()
      specialAttacks.getBullRush(),
      specialAttacks.getCharge(),
      specialAttacks.getDisarm(),
      specialAttacks.getGrapple(),
      specialAttacks.getOverrun(),
      specialAttacks.getSunder()
    );
    return specialAttacksDTO;
  }

  public static String toSpecialAttacks(SpecialAttacksDTO specialAttacksDTO) {
    return specialAttacksDTO.toString();
  }
}
