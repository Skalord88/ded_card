package pl.kolendateam.dadcard.feats.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@NoArgsConstructor
@AllArgsConstructor
public class FeatsDTO {

  public int id;
  public String featName;
  public FeatsTypeEnum[] featType;
  public String benefit;
  public String normal;
  public String special;
  public Set<ModifierDTO> modifiers;
  public PrerequisiteDTO prerequisiteList;
  public PrerequisiteDTO toSelect;

  public FeatsDTO(Feats feats) {
    this.id = feats.getId();
    this.featName = feats.getFeatName();
    this.featType = feats.getFeatType();
    this.benefit = feats.getBenefit();
    this.normal = feats.getNormal();
    this.special = feats.getSpecial();
    this.modifiers =
      feats.getModifiers() != null
        ? MapperModifierBonus.toSetModifierDTO(feats.getModifiers())
        : null;
    this.prerequisiteList =
      feats.getPrerequisiteList() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feats.getPrerequisiteList())
        : null;
    this.toSelect =
      feats.getToSelect() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(feats.getToSelect())
        : null;
  }

  public FeatsDTO(int zero) {
    this.id = zero;
  }
}
