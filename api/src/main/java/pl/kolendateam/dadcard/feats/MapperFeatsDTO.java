package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;

public class MapperFeatsDTO {

  public static ArrayList<FeatsDTO> toFeatsDTO(List<Feats> feats) {
    ArrayList<FeatsDTO> featsDTOList = new ArrayList<>();
    for (Feats feat : feats) {
      FeatsDTO featsDTO = new FeatsDTO(feat);
      featsDTOList.add(featsDTO);
    }

    return featsDTOList;
  }

  public static Set<FeatsDTO> toFeatsSetDTO(Set<Feats> raceFeats) {
    Set<FeatsDTO> raceFeatsDTO = new HashSet<>();
    raceFeats.forEach(feat -> {
      FeatsDTO featDTO = new FeatsDTO(feat);
      raceFeatsDTO.add(featDTO);
    });
    return raceFeatsDTO;
  }
}
