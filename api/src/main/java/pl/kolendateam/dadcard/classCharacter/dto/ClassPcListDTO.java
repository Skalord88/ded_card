package pl.kolendateam.dadcard.classCharacter.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ClassPcListDTO {

  public int id;
  public String classType;
  public String className;
  public int level;
  public boolean firstClass;
  public byte hitDice;
  public double classBab;
  public String savingThrow;
  public byte skillPoints;
}
