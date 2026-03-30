package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.modifier.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;
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
  public Integer levelAdjustment;
  public SizeDTO size;
  public RaceTypeDTO raceType;

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
    this.levelAdjustment =
      subRace.getLevelAdjustment() == null ? 0 : subRace.getLevelAdjustment();
    this.size = MapperSizeToDTO.toSizeDTO(subRace.getSize());
    this.raceType =
      subRace.getRaceType() != null
        ? MapperRaceToDTO.toRaceTypeDTO(subRace.getRaceType())
        : null;
  }
}
