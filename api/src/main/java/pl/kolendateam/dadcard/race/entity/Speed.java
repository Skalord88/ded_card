package pl.kolendateam.dadcard.race.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Speed implements Serializable {

  Integer foot;
  Integer fly;
  Integer climb;
  Integer swim;
  String special;

  public Speed(SpeedDTO speed) {
    this.foot = speed.foot;
    this.fly = speed.fly;
    this.climb = speed.climb;
    this.swim = speed.swim;
    this.special = speed.special;
  }
}
