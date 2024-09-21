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
import pl.kolendateam.dadcard.feats.entity.ClassFeats;
import pl.kolendateam.dadcard.feats.entity.Feats;

public class MapperFeatsDTO {

  public static ArrayList<FeatsDTO> toFeatsDTO(List<Feats> feats) {
    ArrayList<FeatsDTO> featsDTOList = new ArrayList<>();
    feats.forEach(feat -> {
      FeatsDTO featsDTO = new FeatsDTO(feat);
      featsDTOList.add(featsDTO);
    });
    return featsDTOList;
  }

  public static Set<FeatsDTO> toFeatsSetDTO(Set<Feats> raceFeats) {
    Set<FeatsDTO> raceFeatsDTO = new HashSet<>();
    if (raceFeats != null) {
      raceFeats.forEach(feat -> {
        FeatsDTO featDTO = new FeatsDTO(feat);
        raceFeatsDTO.add(featDTO);
      });
      return raceFeatsDTO;
    }
    return raceFeatsDTO;
  }

  public static Set<ClassFeatsDTO> toClassFeatsDTO(Set<ClassFeats> feats) {
    Set<ClassFeatsDTO> toSortFeatsDTO = new HashSet<>();

    if (feats != null) {
      feats.forEach(feat -> {
        ClassFeatsDTO featDTO = new ClassFeatsDTO(feat);
        toSortFeatsDTO.add(featDTO);
      });
    }

    Set<ClassFeatsDTO> sortedFeatsDTO = toSortFeatsDTO
      .stream()
      .sorted(Comparator.comparingInt(ClassFeatsDTO::getLevel))
      .collect(Collectors.toCollection(LinkedHashSet::new));

    return sortedFeatsDTO;
  }

  public static FeatsDTO toFeatDTO(Feats feat) {
    return new FeatsDTO(feat);
  }
}
