package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.dto.FeatsPcDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsPc;

public class MapperFeatsDTO {

  public static ArrayList<FeatsDTO> toFeatsDTO(List<Feats> feats) {
    ArrayList<FeatsDTO> featsDTOList = new ArrayList<>();
    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        FeatsDTO featsDTO = new FeatsDTO(feat);
        featsDTOList.add(featsDTO);
      }
    });
    return featsDTOList;
  }

  public static Set<FeatsDTO> toFeatsSetDTO(Set<Feats> raceFeats) {
    Set<FeatsDTO> raceFeatsDTO = new HashSet<>();
    if (raceFeats != null) raceFeats.forEach(feat -> {
      if (feat != null) {
        FeatsDTO featDTO = new FeatsDTO(feat);
        raceFeatsDTO.add(featDTO);
      }
    });
    return raceFeatsDTO;
  }

  public static Set<ClassFeatsDTO> toClassFeatsDTO(Set<ClassFeats> feats) {
    Set<ClassFeatsDTO> toSortFeatsDTO = new HashSet<>();

    if (feats != null) feats.forEach(feat -> {
      if (feat != null) {
        ClassFeatsDTO featDTO = new ClassFeatsDTO(feat);
        toSortFeatsDTO.add(featDTO);
      }
    });

    Set<ClassFeatsDTO> sortedFeatsDTO = toSortFeatsDTO
      .stream()
      .sorted(Comparator.comparingInt(ClassFeatsDTO::getLevel))
      .collect(Collectors.toCollection(LinkedHashSet::new));

    return sortedFeatsDTO;
  }

  public static FeatsDTO toFeatDTO(Feats feat) {
    if (feat != null) {
      return new FeatsDTO(feat);
    }
    return new FeatsDTO();
  }

  public static ArrayList<FeatsPcDTO> toFeatsPcDTO(List<FeatsPc> featsList) {
    ArrayList<FeatsPcDTO> featsPcDTO = new ArrayList<>();
    if (featsList != null) featsList.forEach(featPc -> {
      if (featPc != null) {
        FeatsPcDTO featPcDTO = new FeatsPcDTO(featPc);
        featsPcDTO.add(featPcDTO);
      }
    });
    return featsPcDTO;
  }
}
