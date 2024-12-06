package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;

public class MapperClassCharacterDTO {

  public static List<ClassCharacterDTO> toClassCharacterListDTO(
    List<ClassCharacter> classCharList
  ) {
    List<ClassCharacterDTO> classCharListDTO = new ArrayList<>();

    classCharList.forEach(classChar -> {
      classCharListDTO.add(new ClassCharacterDTO(classChar));
    });

    return classCharListDTO;
  }

  public static ClassCharacterDTO toClassCharacterDTO(
    ClassCharacter classChar
  ) {
    return classChar == null ? null : new ClassCharacterDTO(classChar);
  }
}
