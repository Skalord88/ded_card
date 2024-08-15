package pl.kolendateam.dadcard.classCharacter;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcListDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

public class MapperClassPcListToDTO {

  public static ArrayList<ClassPcListDTO> toClassPcListDTO(
    List<ClassPc> classPcArray
  ) {
    ArrayList<ClassPcListDTO> classesDTO = new ArrayList<>();

    for (ClassPc classPc : classPcArray) {
      ClassPcListDTO classPcListDTO = new ClassPcListDTO(
        classPc.getClassCharacter().getId(),
        classPc.getClassCharacter().getType().toString(),
        classPc.getClassCharacter().getName().toString(),
        classPc.getLevel(),
        classPc.getClassCharacter().getHitDice(),
        classPc.getClassCharacter().getClassBab(),
        classPc.getClassCharacter().getSavingThrow(),
        classPc.getClassCharacter().getSkillPoints()
      );
      classesDTO.add(classPcListDTO);
    }

    return classesDTO;
  }
}
