package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.entity.ClassFeat;
import pl.kolendateam.dadcard.modifier.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClassFeatDTO {

  public int id;
  public int level;
  public FeatDTO feat;
  public int classId;
  public EnumClass className;
  public PrerequisiteDTO selected;
  public PrerequisiteDTO toSelect;

  public ClassFeatDTO(ClassFeat classFeat) {
    this.id = classFeat.getId();
    this.level = classFeat.getLevel();
    this.feat =
      classFeat.getFeat() != null
        ? MapperFeats.toFeatDTO(classFeat.getFeat())
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
