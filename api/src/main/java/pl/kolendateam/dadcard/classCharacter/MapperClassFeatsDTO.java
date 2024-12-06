package pl.kolendateam.dadcard.classCharacter;

import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;
import pl.kolendateam.dadcard.feats.dto.ClassFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.ClassFeats;

public class MapperClassFeatsDTO {

  public static Set<ClassFeatsDTO> toSetClassFeatDTO(Set<ClassFeats> feats) {
    Set<ClassFeatsDTO> featsDTO = new HashSet<>();
    if (feats != null) {
      feats.forEach(f -> {
        ClassFeatsDTO featDTO = new ClassFeatsDTO(f);
        featsDTO.add(featDTO);
      });
    }
    Set<ClassFeatsDTO> sortedFeatsDTO = featsDTO
      .stream()
      .sorted(Comparator.comparingInt(ClassFeatsDTO::getLevel))
      .collect(Collectors.toCollection(LinkedHashSet::new));

    return sortedFeatsDTO;
  }
  //   public static Set<ClassFeatsDTO> toListClassFeatDTO(
  //     Set<ClassFeats> feats,
  //     FeatsRepository featsRepository,
  //     ItemsRepository itemsRepository
  //   ) {
  //     Set<ClassFeatsDTO> featsDTO = new HashSet<>();
  //     if (feats != null) {
  //       feats.forEach(f -> {
  //         ClassFeatsDTO featDTO = new ClassFeatsDTO(f);
  //         featsDTO.add(featDTO);
  //       });
  //     }
  //     Set<ClassFeatsDTO> sortedFeatsDTO = featsDTO
  //       .stream()
  //       .sorted(Comparator.comparingInt(ClassFeatsDTO::getLevel))
  //       .collect(Collectors.toCollection(LinkedHashSet::new));

  //     return sortedFeatsDTO;
  //   }
}
