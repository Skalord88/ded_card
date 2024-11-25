package pl.kolendateam.dadcard.classCharacter.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClassPcLevel implements Serializable {

  EnumClass classe;
  int level;
}
