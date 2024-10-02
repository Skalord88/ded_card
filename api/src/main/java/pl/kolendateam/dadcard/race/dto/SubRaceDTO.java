package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
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
  public Set<ModifierDTO> modifiers;
  public Set<FeatsDTO> raceFeats;
  public Integer levelAdjustment;
  public SizeDTO size;
  public Set<RegionBaseDTO> availableRegions;

  public SubRaceDTO(SubRace subRace) {
    this.id = subRace.getId();
    this.race = MapperRaceToDTO.toRaceDTO(subRace.getRace());
    this.subRacesName = subRace.getSubRaceName();
    this.avatarUrl = subRace.getAvatarUrl();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(subRace.getModifiers());
    this.raceFeats = MapperFeatsDTO.toFeatsSetDTO(subRace.getSubRaceFeats());
    this.levelAdjustment =
      subRace.getLevelAdjustment() == null ? 0 : subRace.getLevelAdjustment();
    this.size = MapperSizeToDTO.toSizeDTO(subRace.getSize());
    this.availableRegions =
      MaperListRegionToDTO.toRegionBaseDTO(subRace.getAvailableRegions());
  }
}
