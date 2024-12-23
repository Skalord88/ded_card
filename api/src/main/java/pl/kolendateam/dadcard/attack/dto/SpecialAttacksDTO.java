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
  public int vsBullRush;
  public int vsCharge;
  public int vsDisarm;
  public int vsGrapple;
  public int vsOverrun;
  public int vsSunder;
  public String special;

  public SpecialAttacksDTO(SpecialAttacks specialAttacks) {
    this.bullRush = specialAttacks.getBullRush();
    this.charge = specialAttacks.getCharge();
    this.disarm = specialAttacks.getDisarm();
    this.grapple = specialAttacks.getGrapple();
    this.overrun = specialAttacks.getOverrun();
    this.sunder = specialAttacks.getSunder();
    this.vsBullRush = specialAttacks.getVsBullRush();
    this.vsCharge = specialAttacks.getVsCharge();
    this.vsDisarm = specialAttacks.getVsDisarm();
    this.vsGrapple = specialAttacks.getVsGrapple();
    this.vsOverrun = specialAttacks.getVsOverrun();
    this.vsSunder = specialAttacks.getVsSunder();
    this.special = specialAttacks.getSpecial();
  }
}
