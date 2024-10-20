package pl.kolendateam.dadcard.feats.dto;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@NoArgsConstructor
@AllArgsConstructor
public class FeatsDTO {

  public int id;
  public String type;
  public FeatsTypeEnum[] featsType;
  public String prerequisites;
  public String benefit;
  public String normal;
  public String special;

  public Set<ModifierDTO> modifiers;

  // public List<PrerequisiteDTO> prerequisite;

  public FeatsDTO(Feats feats) {
    this.id = feats.getId();
    this.type = feats.getFeatName();
    this.prerequisites = feats.getPrerequisites();
    this.benefit = feats.getBenefit();
    this.normal = feats.getNormal();
    this.special = feats.getSpecial();
    this.featsType = feats.getType();
    // this.prerequisite =
    //   MapperPrerequisiteBonus.toPrerequisiteBonusDTO(feats.getPrerequisite());
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(feats.getModifiers());
  }
}
