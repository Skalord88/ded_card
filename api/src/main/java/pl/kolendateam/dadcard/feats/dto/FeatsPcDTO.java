package pl.kolendateam.dadcard.feats.dto;

import java.io.Serializable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;
import pl.kolendateam.dadcard.modifier.entity.ModifierEnum;

@NoArgsConstructor
@Getter
@Setter
public class FeatsPcDTO implements Serializable {

  public FeatsDTO feat;
  public ModifierEnum[] selected;

  public FeatsPcDTO(FeatsPc featPc) {
    this.feat = MapperFeatsDTO.toFeatDTO(featPc.getFeat());
    this.selected = featPc.getSelected();
  }
}
