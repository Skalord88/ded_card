package pl.kolendateam.dadcard.race.dto;

import pl.kolendateam.dadcard.race.entity.Speed;

public class SpeedDTO {

  public Integer foot;
  public Integer fly;
  public Integer climb;
  public Integer swim;
  public String special;

  public SpeedDTO(Speed speed) {
    this.foot = speed.getFoot() != null ? speed.getFoot() : null;
    this.fly = speed.getFly() != null ? speed.getFly() : null;
    this.climb = speed.getClimb() != null ? speed.getClimb() : null;
    this.swim = speed.getSwim() != null ? speed.getSwim() : null;
    this.special = speed.getSpecial() != null ? speed.getSpecial() : null;
  }
}
