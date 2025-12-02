package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;
import pl.kolendateam.dadcard.modifier.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeatDTO {

  public int id;
  public String featName;
  public FeatsTypeEnum[] featType;
  public String featText;
  public String benefit;
  public String normal;
  public String special;
  // public Set<ModifierDTO> modifiers;
  public PrerequisiteDTO modifiers;
  public PrerequisiteDTO prerequisiteList;
  public PrerequisiteDTO toSelect;
  public PrerequisiteDTO selected;

  public FeatDTO(Feat feat) {
    this.id = feat.getId();
    this.featName = feat.getFeatName();
    this.featType = feat.getFeatType();
    this.featText = feat.getFeatText();
    this.benefit = feat.getBenefit();
    this.normal = feat.getNormal();
    this.special = feat.getSpecial();
    this.modifiers =
      feat.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feat.getModifiers())
        : null;
    this.prerequisiteList =
      feat.getPrerequisiteList() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feat.getPrerequisiteList())
        : null;
    this.toSelect =
      feat.getToSelect() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feat.getToSelect())
        : null;
    this.selected =
      feat.getSelected() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feat.getSelected())
        : null;
  }

  public FeatDTO(int zero) {
    this.id = zero;
  }
}
