package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcToAddDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

public class MapperClassPc {

  public static List<ClassPcDTO> toClassPcListDTO(List<ClassPc> listClassPc) {
    List<ClassPcDTO> listClassPcDTO = new ArrayList<>();

    listClassPc.forEach(classPc -> {
      listClassPcDTO.add(new ClassPcDTO(classPc));
    });

    return listClassPcDTO;
  }

  public static List<ClassPc> toClassPcList(
    List<ClassPcToAddDTO> listOfClassDTO,
    int charId
  ) {
    List<ClassPc> listOfClass = new ArrayList<>();

    listOfClassDTO.forEach(clDTO -> {
      listOfClass.add(
        new ClassPc(clDTO.level, clDTO.firstClass, clDTO.id, charId)
      );
    });
    return listOfClass;
  }
  // public static List<ClassPcDTO> toClassPcList(
  //   List<ClassPcDTO> listClassPcDTO
  // ) {
  //   List<ClassPc> listClassPc = new ArrayList<>();

  //   listClassPcDTO.forEach(classPcDTO -> {

  //   });

  //   return listClassPc;
  // }
}
