package pl.kolendateam.dadcard.feats.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperListOfBonus;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClassFeatsDTO {

  public int level;
  public FeatsDTO feat;
  public int classId;
  public EnumClass className;
  public List<PrerequisiteDTO> listOfBonus;

  public ClassFeatsDTO(ClassFeats classFeat) {
    this.level = classFeat.getLevel();
    this.feat = MapperFeatsDTO.toFeatDTO(classFeat.getFeats());
    this.classId = classFeat.getClassCharacter().getId();
    this.className = classFeat.getClassCharacter().getName();
    this.listOfBonus =
      MapperListOfBonus.toListOfBonusDTO(classFeat.getListOfBonus());
  }
}
