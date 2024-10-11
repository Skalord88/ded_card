package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Prerequisite implements Serializable {

  String type;
  int id;
}
