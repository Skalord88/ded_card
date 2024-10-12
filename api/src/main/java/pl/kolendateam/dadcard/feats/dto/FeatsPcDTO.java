package pl.kolendateam.dadcard.feats.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;

@NoArgsConstructor
@Getter
@Setter
public class FeatsPcDTO implements Serializable {

  public FeatsDTO feat;
  public List<PrerequisiteDTO> selected;

  public FeatsPcDTO(FeatsPc featPc) {
    this.feat = MapperFeatsDTO.toFeatDTO(featPc.getFeat());
    this.selected =
      MapperPrerequisiteBonus.toPrerequisiteBonusDTO(featPc.getSelected());
  }
}
