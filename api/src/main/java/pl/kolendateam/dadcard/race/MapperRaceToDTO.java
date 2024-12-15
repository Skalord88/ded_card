package pl.kolendateam.dadcard.race;

import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.SubRace;

public class MapperRaceToDTO {

  public static RaceDTO toRaceDTO(Race race) {
    return new RaceDTO(race);
  }

  public static SubRaceDTO toSubRaceDTO(SubRace subRace) {
    return new SubRaceDTO(subRace);
  }
}
