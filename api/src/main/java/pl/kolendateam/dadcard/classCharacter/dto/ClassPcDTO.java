package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.MapperClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.ClassTypeEnum;

@NoArgsConstructor
public class ClassPcDTO {

  public int level;
  public boolean firstClass;
  public ClassCharacterDTO classCharacter;
  public Integer baseClass;

  public ClassPcDTO(ClassPc classPc) {
    this.level = classPc.getLevel();
    this.firstClass = classPc.getFirstClass();
    ClassCharacterDTO classDTO = MapperClassCharacter.toClassCharacterDTO(
      classPc.getClassCharacter()
    );
    System.out.println("ClassCharacterDTO: " + classDTO);
    if (classDTO != null) {
      this.classCharacter = classDTO;

      System.out.println("classDTO.classType: " + classDTO.classType);
      System.out.println("baseClass: " + classPc.getBaseClass());

      if (classDTO.classType.equals(ClassTypeEnum.PRESTIGE_CLASS)) {
        this.baseClass = classPc.getBaseClass();
      }
    }
  }
}
