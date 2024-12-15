package pl.kolendateam.dadcard.race.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperFeatsDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.race.entity.Race;

@NoArgsConstructor
public class RaceDTO {

  public int id;
  public String raceName;
  public String avatarRaceUrl;
  public PrerequisiteDTO modifiers;
  public Set<FeatsDTO> feats;

  public RaceDTO(Race race) {
    this.id = race.getId();
    this.avatarRaceUrl = race.getAvatarUrl();
    this.raceName = race.getRaceName();
    this.modifiers =
      race.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(race.getModifiers())
        : null;
    this.feats = MapperFeatsDTO.toFeatsSetDTO(race.getRaceFeats());
  }
}
