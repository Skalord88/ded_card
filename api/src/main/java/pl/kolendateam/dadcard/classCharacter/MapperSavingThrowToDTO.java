package pl.kolendateam.dadcard.classCharacter;

import pl.kolendateam.dadcard.classCharacter.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;

public class MapperSavingThrowToDTO {

  public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow) {
    return new SavingThrowDTO(savingThrow);
  }
}
