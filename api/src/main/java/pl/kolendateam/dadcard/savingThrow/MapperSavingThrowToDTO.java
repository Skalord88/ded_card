package pl.kolendateam.dadcard.savingThrow;

import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.savingThrow.entity.SavingThrow;

public class MapperSavingThrowToDTO {

  public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow) {
    return new SavingThrowDTO(savingThrow);
  }
}
