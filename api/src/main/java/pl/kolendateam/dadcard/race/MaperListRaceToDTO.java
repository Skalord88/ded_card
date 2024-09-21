package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.SubRace;

public class MaperListRaceToDTO {

  public static ArrayList<RaceDTO> toListRaceDTO(List<Race> races) {
    ArrayList<RaceDTO> racesDTO = new ArrayList<>();

    races.forEach(race -> {
      RaceDTO raceDTO = new RaceDTO(race);
      racesDTO.add(raceDTO);
    });
    return racesDTO;
  }

  public static ArrayList<SubRaceDTO> toListSubRaceDTO(List<SubRace> subRaces) {
    ArrayList<SubRaceDTO> racesDTO = new ArrayList<>();

    subRaces.forEach(sub -> {
      SubRaceDTO raceDTO = new SubRaceDTO(sub);
      racesDTO.add(raceDTO);
    });

    return racesDTO;
  }
}
