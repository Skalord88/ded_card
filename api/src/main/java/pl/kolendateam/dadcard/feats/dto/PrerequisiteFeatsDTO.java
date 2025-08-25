package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.feats.entity.Feat;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@ToString
public class PrerequisiteFeatsDTO {

  public int id;
  public String featName;
  public String benefit;
  public String normal;
  public String special;

  public PrerequisiteFeatsDTO(Feat feat) {
    this.id = feat.getId();
    this.featName = feat.getFeatName();
    this.benefit = feat.getBenefit();
    this.normal = feat.getNormal();
    this.special = feat.getSpecial();
  }
}
