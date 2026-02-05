package pl.kolendateam.dadcard.race;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.race.dto.AlignmentDTO;
import pl.kolendateam.dadcard.race.dto.DeityDTO;
import pl.kolendateam.dadcard.race.dto.RaceDTO;
import pl.kolendateam.dadcard.race.dto.RaceTypeDTO;
import pl.kolendateam.dadcard.race.dto.RacialRegionDTO;
import pl.kolendateam.dadcard.race.dto.RegionDTO;
import pl.kolendateam.dadcard.race.dto.SubRaceDTO;
import pl.kolendateam.dadcard.race.entity.Alignment;
import pl.kolendateam.dadcard.race.entity.Deity;
import pl.kolendateam.dadcard.race.entity.Race;
import pl.kolendateam.dadcard.race.entity.RaceType;
import pl.kolendateam.dadcard.race.entity.RacialRegion;
import pl.kolendateam.dadcard.race.entity.SubRace;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

public class MapperRaceToDTO {

  public static RaceDTO toRaceDTO(Race race) {
    return new RaceDTO(race);
  }

  public static SubRaceDTO toSubRaceDTO(SubRace subRace) {
    return new SubRaceDTO(subRace);
  }

  public static RaceTypeDTO toRaceTypeDTO(RaceType raceTypes) {
    if (raceTypes == null) {
      return new RaceTypeDTO();
    } else {
      return new RaceTypeDTO(raceTypes);
    }
  }

  public static AlignmentDTO toAlignmentDTO(Alignment alignment) {
    if (alignment == null) {
      return new AlignmentDTO();
    } else {
      return new AlignmentDTO(alignment);
    }
  }

  public static Set<AlignmentDTO> toAlignmentDTOSet(Set<Alignment> alignments) {
    Set<AlignmentDTO> alignmentDTOSet = new HashSet<>();

    if (alignments == null) {
      return new HashSet<>();
    } else {
      alignments.forEach(al -> {
        if (al != null) {
          alignmentDTOSet.add(new AlignmentDTO(al));
        }
      });
    }
    return alignmentDTOSet;
  }

  // public static DeityDTO toAlignmentDTO(Deity deity) {
  //   if (deity == null) {
  //     return new DeityDTO();
  //   } else {
  //     return new DeityDTO(deity);
  //   }
  // }

  public static Set<DeityDTO> toDeityDTOSet(
    List<Deity> deitis,
    SpellsRepository spellsRepository
  ) {
    Set<DeityDTO> deitisDTOSet = new HashSet<>();

    if (deitis == null) {
      return new HashSet<>();
    } else {
      deitis.forEach(de -> {
        if (de != null) {
          deitisDTOSet.add(new DeityDTO(de, spellsRepository));
        }
      });
    }

    return deitisDTOSet;
  }

  public static DeityDTO toDeityDTO(Deity deity) {
    if (deity == null) {
      return null;
    } else {
      return new DeityDTO(deity);
    }
  }

  public static Set<RacialRegionDTO> toRacialRegionDTOSet(
    List<RacialRegion> regions,
    SpellsRepository spellsRepository
  ) {
    Set<RacialRegionDTO> regionsDTOSet = new HashSet<>();

    if (regions == null) {
      return new HashSet<>();
    } else {
      regions.forEach(re -> {
        if (re != null) {
          regionsDTOSet.add(new RacialRegionDTO(re, spellsRepository));
        }
      });
    }
    return regionsDTOSet;
  }

  public static RacialRegionDTO toRegionFromRacialRegionDTO(
    RacialRegion region
  ) {
    if (region == null) {
      return null;
    } else {
      return new RacialRegionDTO(region);
    }
  }
}
