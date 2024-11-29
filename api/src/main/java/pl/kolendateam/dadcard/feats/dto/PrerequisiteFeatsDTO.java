package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Feats;

@NoArgsConstructor
@AllArgsConstructor
public class PrerequisiteFeatsDTO {

  public int id;
  public String featName;
  public String benefit;
  public String normal;
  public String special;

  public PrerequisiteFeatsDTO(Feats feat) {
    this.id = feat.getId();
    this.featName = feat.getFeatName();
    this.benefit = feat.getBenefit();
    this.normal = feat.getNormal();
    this.special = feat.getSpecial();
  }
}
