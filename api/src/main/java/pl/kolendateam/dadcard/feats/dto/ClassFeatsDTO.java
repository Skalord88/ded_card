package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
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
  public PrerequisiteDTO selected;
  public PrerequisiteDTO toSelect;

  public ClassFeatsDTO(ClassFeats classFeat) {
    this.level = classFeat.getLevel();
    this.feat = MapperFeatsDTO.toFeatDTO(classFeat.getFeats());
    this.classId = classFeat.getClassCharacter().getId();
    this.className = classFeat.getClassCharacter().getName();
    this.selected =
      MapperPrerequisiteBonus.toPrerequisiteDTO(classFeat.getSelected());
    this.toSelect =
      MapperPrerequisiteBonus.toPrerequisiteDTO(classFeat.getToSelect());
  }
}
