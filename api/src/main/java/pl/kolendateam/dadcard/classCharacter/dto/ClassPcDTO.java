package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.classCharacter.MapperClassCharacterDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;

@NoArgsConstructor
public class ClassPcDTO {

  public int level;
  public boolean firstClass;
  public ClassCharacterDTO classCharacter;

  public ClassPcDTO(ClassPc classPc) {
    this.level = classPc.getLevel();
    this.firstClass = classPc.getFirstClass();
    this.classCharacter =
      MapperClassCharacterDTO.toClassCharacterDTO(classPc.getClassCharacter());
  }
}
