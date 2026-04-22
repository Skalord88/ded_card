package pl.kolendateam.dadcard.modifier;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.modifier.entity.Prerequisite;

public class MapperPrerequisiteBonus {

  public static PrerequisiteDTO toPrerequisiteDTO(Prerequisite pre) {
    return new PrerequisiteDTO(pre);
  }

  public static PrerequisiteDTO toPrerequisiteDTO(
    Prerequisite pre,
    String text
  ) {
    PrerequisiteDTO preDTO = new PrerequisiteDTO(pre);
    preDTO.setText(text);
    return preDTO;
  }

  public static List<PrerequisiteDTO> toPrerequisiteListDTO(
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

  public static Prerequisite toPrerequisite(PrerequisiteDTO preDTO) {
    return new Prerequisite(preDTO);
  }
}
