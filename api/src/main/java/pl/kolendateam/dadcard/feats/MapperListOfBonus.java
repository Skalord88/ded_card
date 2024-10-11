package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperListOfBonus {

  public static List<PrerequisiteDTO> toListOfBonusDTO(
    List<Prerequisite> listOfBonus
  ) {
    List<PrerequisiteDTO> listOfBonusDTO = new ArrayList<>();
    if (listOfBonus != null) {
      for (Prerequisite bonus : listOfBonus) {
        PrerequisiteDTO bonusDTO = new PrerequisiteDTO(bonus);
        listOfBonusDTO.add(bonusDTO);
      }
    }

    return listOfBonusDTO;
  }
}
