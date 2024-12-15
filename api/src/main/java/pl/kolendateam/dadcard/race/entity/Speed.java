package pl.kolendateam.dadcard.race.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
