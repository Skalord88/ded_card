package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Prerequisite implements Serializable {

  String type;
  int value;
}
