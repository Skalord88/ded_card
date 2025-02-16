package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClassFeatsDTO {

  public int id;
  public int level;
  public FeatsDTO feat;
  public int classId;
  public EnumClass className;
  public PrerequisiteDTO selected;
  public PrerequisiteDTO toSelect;

  public ClassFeatsDTO(ClassFeats classFeat) {
    this.id = classFeat.getId();
    this.level = classFeat.getLevel();
    this.feat =
      classFeat.getFeats() != null
        ? MapperFeats.toFeatDTO(classFeat.getFeats())
        : null;
    this.classId = classFeat.getClassCharacter().getId();
    this.className = classFeat.getClassCharacter().getName();
    this.selected =
      classFeat.getSelected() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(classFeat.getSelected())
        : null;
    this.toSelect =
      classFeat.getToSelect() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(classFeat.getToSelect())
        : null;
  }
}
