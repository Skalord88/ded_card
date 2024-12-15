package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.race.entity.Archetype;

@NoArgsConstructor
public class ArchetypeDTO {

  public int id;
  public String archetypeName;
  // public Set<ModifierDTO> modifiers;
  public PrerequisiteDTO modifiers;
  public Set<FeatsDTO> archetypeFeats;
  public int levelAdjustment;
  public String avatarUrl;

  public ArchetypeDTO(Archetype archetype) {
    this.id = archetype.getId();
    this.archetypeName = archetype.getArchetypeName();
    this.modifiers =
      archetype.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(archetype.getModifiers())
        : null;
    // MapperModifierBonus.toSetModifierDTO(archetype.getModifiers());
    this.archetypeFeats =
      MapperFeatsDTO.toFeatsSetDTO(archetype.getArchetypeFeats());
    this.levelAdjustment = archetype.getLevelAdjustment();
    this.avatarUrl = archetype.getAvatarUrl();
  }
}
