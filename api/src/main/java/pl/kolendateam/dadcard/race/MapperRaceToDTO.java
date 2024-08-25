package pl.kolendateam.dadcard.race;

import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.entity.Race;

public class MapperRaceToDTO {

  public static RaceDTO toRaceDTO(Race race) {
    return new RaceDTO(race);
  }
}
