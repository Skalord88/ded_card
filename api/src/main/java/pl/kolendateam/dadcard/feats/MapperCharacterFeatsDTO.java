package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.feats.dto.CharacterFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;

public class MapperCharacterFeatsDTO {

  public static ArrayList<CharacterFeatsDTO> toCharacterFeatsDTO(
    List<CharacterFeat> feats
  ) {
    ArrayList<CharacterFeatsDTO> featsDTOList = new ArrayList<>();
    if (feats != null) {
      for (CharacterFeat feat : feats) {
        CharacterFeatsDTO featsDTO = new CharacterFeatsDTO(feat);
        featsDTOList.add(featsDTO);
      }
    }

    return featsDTOList;
  }
}
