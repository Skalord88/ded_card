package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.race.entity.Archetype;

@NoArgsConstructor
public class ArchetypeDTO {

  public int id;
  public String archetypeName;
  public Set<ModifierDTO> modifiers;
  public Set<FeatsDTO> archetypeFeats;
  public int levelAdjustment;
  public String avatarUrl;

  public ArchetypeDTO(Archetype archetype) {
    this.id = archetype.getId();
    this.archetypeName = archetype.getArchetypeName();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(archetype.getModifiers());
    this.archetypeFeats =
      MapperFeatsDTO.toFeatsSetDTO(archetype.getArchetypeFeats());
    this.levelAdjustment = archetype.getLevelAdjustment();
    this.avatarUrl = archetype.getAvatarUrl();
  }
}
