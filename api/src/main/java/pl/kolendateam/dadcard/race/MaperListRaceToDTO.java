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
    // for (Race race : races) {
    //   boolean skipCreateRaceDTO = false;

    //   for (RaceDTO raceDTO : racesDTO) {
    //     if (raceDTO.id == race.getId()) {
    //       SubRaceDTO tempSubRace = new SubRaceDTO(race);
    //       raceDTO.subRaces.add(tempSubRace);
    //       skipCreateRaceDTO = true;
    //     }
    //   }

    //   if (!skipCreateRaceDTO) {
    //     RaceBaseDTO tempRace = new RaceBaseDTO(race);
    //     racesDTO.add(tempRace);
    //   }
    // }

    // return racesDTO;
  }

  public static ArrayList<SubRaceDTO> toListSubRaceDTO(List<SubRace> races) {
    ArrayList<SubRaceDTO> racesDTO = new ArrayList<>();

    races.forEach(race -> {
      SubRaceDTO raceDTO = new SubRaceDTO(race);
      racesDTO.add(raceDTO);
    });
    return racesDTO;
  }
}
