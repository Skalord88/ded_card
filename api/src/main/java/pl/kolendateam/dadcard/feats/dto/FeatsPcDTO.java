package pl.kolendateam.dadcard.feats.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.MapperFeats;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeatsPcDTO implements Serializable {

  public int id;
  public FeatsDTO feat;
  public Integer level;
  public ClassFeatsDTO classFeat;
  public PrerequisiteDTO selected;

  public FeatsPcDTO(FeatsPc featPc) {
    this.id = featPc.getId();
    this.level = featPc.getLevel() != null ? featPc.getLevel() : null;
    this.classFeat =
      featPc.getClassFeat() != null
        ? MapperFeats.toClassFeatsDTO(featPc.getClassFeat())
        : null;
    this.feat =
      featPc.getFeat() != null ? MapperFeats.toFeatDTO(featPc.getFeat()) : null;
    this.selected =
      featPc.getSelected() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(featPc.getSelected())
        : null;
  }

  public int typeOfFeatsPcDTO() {
    if (this.feat != null && this.classFeat == null) return 1;
    if (this.feat != null && this.classFeat != null) return 2;

    return -1;
  }
}
