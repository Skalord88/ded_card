package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

public class MapperClassPcDTO {

  public static List<ClassPcDTO> toClassPcList(List<ClassPc> listClassPc) {
    List<ClassPcDTO> listClassPcDTO = new ArrayList<>();

    listClassPc.forEach(classPc -> {
      listClassPcDTO.add(new ClassPcDTO(classPc));
    });

    return listClassPcDTO;
  }
}
