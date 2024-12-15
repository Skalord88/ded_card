package pl.kolendateam.dadcard.savingThrow.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Resistance implements Serializable {

  ModifierEnum type;
  ModifierEnum[] target;
  Integer bonus;
  // vs SAVING POISON 2
}
