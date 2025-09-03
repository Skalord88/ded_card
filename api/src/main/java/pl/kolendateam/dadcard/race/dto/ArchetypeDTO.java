package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.race.entity.Archetype;

@NoArgsConstructor
public class ArchetypeDTO {

  public int id;
  public String archetypeName;
  public PrerequisiteDTO modifiers;
  // public Set<FeatsDTO> archetypeFeats;
  // public Set<SpecialAbilitiesDTO> specialAbilities;
  public int levelAdjustment;
  public String avatarUrl;
  public RaceTypeDTO raceType;

  public ArchetypeDTO(Archetype archetype) {
    this.id = archetype.getId();
    this.archetypeName = archetype.getArchetypeName();
    this.modifiers =
      archetype.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(archetype.getModifiers())
        : null;
    // MapperModifierBonus.toSetModifierDTO(archetype.getModifiers());
    // this.archetypeFeats =
    //   MapperFeats.toFeatsSetDTO(archetype.getArchetypeFeats());
    this.levelAdjustment = archetype.getLevelAdjustment();
    // this.specialAbilities =
    //   archetype.getSpecialAbilities() != null
    // ? MapperSpecialAbilities.toSpecialAbilitiesDTOSet(
    //   archetype.getSpecialAbilities()
    // )
    // : null;
    this.avatarUrl = archetype.getAvatarUrl();
    this.raceType =
      archetype.getRaceType() != null
        ? new RaceTypeDTO(archetype.getRaceType())
        : null;
  }
}
