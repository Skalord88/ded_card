package pl.kolendateam.dadcard.size;

import pl.kolendateam.dadcard.size.dto.SizeDTO;
import pl.kolendateam.dadcard.size.entity.Size;

public class MapperSizeToDTO {

  public static SizeDTO toSizeDTO(Size size) {
    return new SizeDTO(size);
  }
}
