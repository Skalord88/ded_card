package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class SpecialAttacks implements Serializable {

  int bullRush;
  int charge;
  int disarm;
  int grapple;
  int overrun;
  int sunder;
  int vsBullRush;
  int vsCharge;
  int vsDisarm;
  int vsGrapple;
  int vsOverrun;
  int vsSunder;
  String special;

  public SpecialAttacks(SpecialAttacksDTO specialAttacks) {
    this.charge = specialAttacks.charge;
    this.disarm = specialAttacks.disarm;
    this.grapple = specialAttacks.grapple;
    this.overrun = specialAttacks.overrun;
    this.sunder = specialAttacks.sunder;
    this.vsBullRush = specialAttacks.vsBullRush;
    this.vsCharge = specialAttacks.vsCharge;
    this.vsDisarm = specialAttacks.vsDisarm;
    this.vsGrapple = specialAttacks.vsGrapple;
    this.vsOverrun = specialAttacks.vsOverrun;
    this.vsSunder = specialAttacks.vsSunder;
    this.special = specialAttacks.special;
  }
}
