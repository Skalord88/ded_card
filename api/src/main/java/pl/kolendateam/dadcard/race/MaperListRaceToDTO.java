package pl.kolendateam.dadcard.race;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.race.dto.ArchetypeDTO;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Archetype;
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

  public static ArrayList<ArchetypeDTO> toListArchetypeDTO(
    List<Archetype> archetypes
  ) {
    ArrayList<ArchetypeDTO> archetypesDTO = new ArrayList<>();

    archetypes.forEach(arche -> {
      ArchetypeDTO archetypeDTO = new ArchetypeDTO(arche);
      archetypesDTO.add(archetypeDTO);
    });

    return archetypesDTO;
  }

  public static Set<ArchetypeDTO> toSetArchetypeDTO(Set<Archetype> archetypes) {
    Set<ArchetypeDTO> archetypesDTO = new HashSet<>();

    if (archetypes != null) {
      archetypes.forEach(arche -> {
        ArchetypeDTO archetypeDTO = new ArchetypeDTO(arche);
        archetypesDTO.add(archetypeDTO);
      });
      return archetypesDTO;
    }

    return archetypesDTO;
  }
}
