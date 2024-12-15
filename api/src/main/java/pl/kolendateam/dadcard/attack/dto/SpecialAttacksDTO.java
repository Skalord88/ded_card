package pl.kolendateam.dadcard.attack.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;

@AllArgsConstructor
@NoArgsConstructor
public class SpecialAttacksDTO {

  public int bullRush;
  public int charge;
  public int disarm;
  public int grapple;
  public int overrun;
  public int sunder;

  public SpecialAttacksDTO(SpecialAttacks specialAttacks) {
    this.bullRush = specialAttacks.getBullRush();
    this.charge = specialAttacks.getCharge();
    this.disarm = specialAttacks.getDisarm();
    this.grapple = specialAttacks.getGrapple();
    this.overrun = specialAttacks.getOverrun();
    this.sunder = specialAttacks.getSunder();
  }
}
