package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;

@AllArgsConstructor
@NoArgsConstructor
public class SavingThrowDTO {

  public int fortitude;
  public int reflex;
  public int will;

  public SavingThrowDTO(SavingThrow savingThrow) {
    this.fortitude = savingThrow.getFortitude();
    this.reflex = savingThrow.getReflex();
    this.will = savingThrow.getWill();
  }
}
