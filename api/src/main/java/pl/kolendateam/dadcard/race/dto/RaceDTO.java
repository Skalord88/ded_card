package pl.kolendateam.dadcard.race.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.race.MapperRaceToDTO;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class RaceDTO {

  public int id;
  public String raceName;
  public String avatarRaceUrl;
  public PrerequisiteDTO modifiers;
  public RaceTypeDTO raceType;

  // public Set<FeatsDTO> feats;

  public RaceDTO(Race race) {
    this.id = race.getId();
    this.avatarRaceUrl = race.getAvatarUrl();
    this.raceName = race.getRaceName();
    this.modifiers =
      race.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(race.getModifiers())
        : null;
    this.raceType =
      race.getRaceType() != null
        ? MapperRaceToDTO.toRaceTypeDTO(race.getRaceType())
        : null;
  }
}
// this.feats = MapperFeats.toFeatsSetDTO(race.getRaceFeats());
