package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.modifier.MapperSpecialAbilities;
import pl.kolendateam.dadcard.modifier.dto.SpecialAbilitiesDTO;
import pl.kolendateam.dadcard.race.MaperListRegionToDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.size.MapperSizeToDTO;
import pl.kolendateam.dadcard.size.dto.SizeDTO;

@NoArgsConstructor
public class SubRaceDTO {

  public int id;
  public RaceDTO race;
  public String subRacesName;
  public String avatarUrl;
  public PrerequisiteDTO modifiers;
  public Set<FeatsDTO> raceFeats;
  public Integer levelAdjustment;
  public SizeDTO size;
  public Set<SpecialAbilitiesDTO> specialAbilities;
  public Set<RegionBaseDTO> availableRegions;

  // public Integer hitDice;
  // public Integer numberHitDice;

  public SubRaceDTO(SubRace subRace) {
    this.id = subRace.getId();
    this.race =
      subRace.getRace() != null
        ? MapperRaceToDTO.toRaceDTO(subRace.getRace())
        : null;
    this.subRacesName = subRace.getSubRaceName();
    this.avatarUrl = subRace.getAvatarUrl();
    this.modifiers =
      subRace.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(subRace.getModifiers())
        : null;
    this.raceFeats = MapperFeatsDTO.toFeatsSetDTO(subRace.getSubRaceFeats());
    this.levelAdjustment =
      subRace.getLevelAdjustment() == null ? 0 : subRace.getLevelAdjustment();
    this.size = MapperSizeToDTO.toSizeDTO(subRace.getSize());
    this.availableRegions =
      MaperListRegionToDTO.toRegionBaseDTO(subRace.getAvailableRegions());
    this.specialAbilities =
      subRace.getSpecialAbilities() != null
        ? MapperSpecialAbilities.toSpecialAbilitiesDTOSet(
          subRace.getSpecialAbilities()
        )
        : null;
    // this.hitDice = subRace.getHitDice() != null ? subRace.getHitDice() : null;
    // this.numberHitDice =
    //   subRace.getNumberHitDice() != null ? subRace.getNumberHitDice() : null;
  }
}
