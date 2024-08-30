package pl.kolendateam.dadcard.classCharacter.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;

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
  public Set<ClassFeatsDTO> feats;
}
