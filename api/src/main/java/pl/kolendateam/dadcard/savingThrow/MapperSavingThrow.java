package pl.kolendateam.dadcard.savingThrow;

import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.savingThrow.entity.SavingThrow;

public class MapperSavingThrow {

  public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow) {
    return new SavingThrowDTO(savingThrow);
  }

  public static SavingThrow toSavingThrow(SavingThrowDTO savingThrow) {
    return new SavingThrow(savingThrow);
  }
}
