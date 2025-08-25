package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import pl.kolendateam.dadcard.feats.dto.ClassFeatDTO;
import pl.kolendateam.dadcard.feats.dto.FeatDTO;
import pl.kolendateam.dadcard.feats.dto.FeatPcDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeat;
import pl.kolendateam.dadcard.feats.entity.Feat;
import pl.kolendateam.dadcard.feats.entity.FeatPc;

public class MapperFeats {

  public static List<FeatDTO> toFeatsDTO(List<Feat> feats) {
    List<FeatDTO> featsDTOList = new ArrayList<>();
    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        FeatDTO featsDTO = new FeatDTO(feat);
        featsDTOList.add(featsDTO);
      }
    });
    return featsDTOList;
  }

  public static List<PrerequisiteFeatsDTO> toPrerequisiteFeatsDTO(
    List<Feat> feats
  ) {
    List<PrerequisiteFeatsDTO> featsDTOList = new ArrayList<>();
    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        PrerequisiteFeatsDTO featsDTO = new PrerequisiteFeatsDTO(feat);
        featsDTOList.add(featsDTO);
      }
    });
    return featsDTOList;
  }

  public static Set<FeatDTO> toFeatsSetDTO(Set<Feat> raceFeats) {
    Set<FeatDTO> raceFeatsDTO = new HashSet<>();
    if (raceFeats != null) raceFeats.forEach(feat -> {
      if (feat != null) {
        FeatDTO featDTO = new FeatDTO(feat);
        raceFeatsDTO.add(featDTO);
      }
    });
    return raceFeatsDTO;
  }

  public static List<ClassFeatDTO> toClassFeatsDTO(List<ClassFeat> feats) {
    List<ClassFeatDTO> toListFeatsDTO = new ArrayList<>();
    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        ClassFeatDTO featDTO = new ClassFeatDTO(feat);
        toListFeatsDTO.add(featDTO);
      }
    });
    return toListFeatsDTO;
  }

  public static Set<ClassFeatDTO> toClassFeatsDTO(Set<ClassFeat> feats) {
    Set<ClassFeatDTO> toSortFeatsDTO = new HashSet<>();

    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        ClassFeatDTO featDTO = new ClassFeatDTO(feat);
        toSortFeatsDTO.add(featDTO);
      }
    });

    Set<ClassFeatDTO> sortedFeatsDTO = toSortFeatsDTO
      .stream()
      .sorted(Comparator.comparingInt(ClassFeatDTO::getLevel))
      .collect(Collectors.toCollection(LinkedHashSet::new));

    return sortedFeatsDTO;
  }

  public static FeatDTO toFeatDTO(Feat feat) {
    if (feat != null) {
      return new FeatDTO(feat);
    }
    return new FeatDTO();
  }

  public static FeatPcDTO toFeatPcDTO(FeatPc feat) {
    if (feat != null) {
      return new FeatPcDTO(feat);
    }
    return new FeatPcDTO();
  }

  public static ClassFeatDTO toClassFeatDTO(ClassFeat feat) {
    if (feat != null) {
      return new ClassFeatDTO(feat);
    }
    return new ClassFeatDTO();
  }

  public static ArrayList<FeatPcDTO> toFeatsPcDTO(List<FeatPc> featsList) {
    ArrayList<FeatPcDTO> featsPcDTO = new ArrayList<>();
    if (featsList != null) featsList.forEach(featPc -> {
      if (featPc != null) {
        FeatPcDTO featPcDTO = new FeatPcDTO(featPc);
        featsPcDTO.add(featPcDTO);
      }
    });
    return featsPcDTO;
  }

  public static List<Feat> toFeats(List<PrerequisiteFeatsDTO> feats) {
    List<Feat> featsList = new ArrayList<>();
    if (feats != null) feats.forEach(featDTO -> {
      if (featDTO != null) {
        Feat feat = new Feat(featDTO);
        System.out.println("Feat Selected: " + feat);
        featsList.add(feat);
      }
    });
    return featsList;
  }
}
