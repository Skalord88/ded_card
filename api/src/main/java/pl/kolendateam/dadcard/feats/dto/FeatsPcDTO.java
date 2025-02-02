package pl.kolendateam.dadcard.feats.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FeatsPcDTO implements Serializable {

  public int level;

  public FeatsDTO feat;
  public PrerequisiteDTO selected;

  public FeatsPcDTO(FeatsPc featPc) {
    this.feat = MapperFeatsDTO.toFeatDTO(featPc.getFeat());
    this.selected =
      featPc.getSelected() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(featPc.getSelected())
        : null;
  }
}
