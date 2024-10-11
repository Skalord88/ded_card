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
  public String featName;
  public FeatsTypeEnum featsType;
  public PrerequisiteDTO prerequisite;
  public Set<ModifierDTO> modifiers;
  public String description;

  public FeatsDTO(Feats feats) {
    this.id = feats.getId();
    this.featName = feats.getFeatName();
    this.featsType = feats.getFeatsType();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(feats.getModifiers());
    this.description = feats.getDescription();
  }
}
