package pl.kolendateam.dadcard.feats.dto;

import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.val;
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
  public FeatsTypeEnum[] type;
  // public String prerequisites;
  public String benefit;
  public String normal;
  public String special;
  public Set<ModifierDTO> modifiers;
  public List<PrerequisiteDTO> prerequisiteList;
  public List<PrerequisiteDTO> toSelect;

  public FeatsDTO(Feats feats) {
    this.id = feats.getId();
    this.featName = feats.getFeatName();
    this.type = feats.getType();
    // this.prerequisites = feats.getPrerequisites();
    this.benefit = feats.getBenefit();
    this.normal = feats.getNormal();
    this.special = feats.getSpecial();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(feats.getModifiers());
    this.prerequisiteList =
      MapperPrerequisiteBonus.toPrerequisiteListDTO(
        feats.getPrerequisiteList()
      );
    this.toSelect =
      MapperPrerequisiteBonus.toPrerequisiteListDTO(feats.getToSelect());
  }

  public FeatsDTO(int zero) {
    this.id = zero;
  }
}
