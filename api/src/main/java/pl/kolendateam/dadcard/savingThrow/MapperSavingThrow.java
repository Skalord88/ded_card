package pl.kolendateam.dadcard.savingThrow;

import pl.kolendateam.dadcard.savingThrow.dto.SavingThrowDTO;
import pl.kolendateam.dadcard.savingThrow.entity.SavingThrow;

public class MapperSavingThrow {

  public static SavingThrowDTO toSavingThrowDTO(SavingThrow savingThrow) {
    return new SavingThrowDTO(savingThrow);
  }

  public static SavingThrowDTO[] toSavingThrowDTOArray(
    SavingThrow[] savingThrows
  ) {
    return java.util.Arrays
      .stream(savingThrows)
      .map(MapperSavingThrow::toSavingThrowDTO)
      .toArray(SavingThrowDTO[]::new);
  }

  public static SavingThrow toSavingThrow(SavingThrowDTO savingThrow) {
    return new SavingThrow(savingThrow);
  }

  public static SavingThrow[] toSavingThrowArray(
    SavingThrowDTO[] savingThrows
  ) {
    return java.util.Arrays
      .stream(savingThrows)
      .map(MapperSavingThrow::toSavingThrow)
      .toArray(SavingThrow[]::new);
  }
}
