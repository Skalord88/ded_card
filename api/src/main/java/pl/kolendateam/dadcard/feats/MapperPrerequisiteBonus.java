package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;
import pl.kolendateam.dadcard.race.entity.Speed;

public class MapperPrerequisiteBonus {

  public static PrerequisiteDTO toPrerequisiteDTO(Prerequisite pre) {
    return new PrerequisiteDTO(pre);
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

  public static SpeedDTO toSpeedDTO(Speed speed) {
    return new SpeedDTO(speed);
  }
}
