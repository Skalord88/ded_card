package pl.kolendateam.dadcard.classCharacter.entity;

import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;

@Setter
@Getter
@NoArgsConstructor
public class SavingThrow implements Serializable {

  int fortitude;
  int reflex;
  int will;

  public SavingThrow(SavingThrowDTO saving) {
    this.fortitude = saving.fortitude;
    this.reflex = saving.reflex;
    this.will = saving.will;
  }

  public boolean checkPrerequisiteST(SavingThrow savingThrow) {
    return (
      fortitude >= savingThrow.fortitude ||
      reflex >= savingThrow.reflex ||
      will >= savingThrow.will
    );
  }
}
