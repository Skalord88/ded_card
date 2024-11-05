package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperPrerequisiteBonus {

  public static List<Set<PrerequisiteDTO>> toPrerequisiteSetDTO(
    List<Set<Prerequisite>> listOfBonus
  ) {
    List<Set<PrerequisiteDTO>> listOfBonusDTO = new ArrayList<>();
    if (listOfBonus != null) {
      for (Set<Prerequisite> inSet : listOfBonus) {
        if (inSet != null) {
          Set<PrerequisiteDTO> newSet = new HashSet<>();
          for (Prerequisite prer : inSet) {
            PrerequisiteDTO bonusDTO = new PrerequisiteDTO(prer);
            newSet.add(bonusDTO);
          }
          listOfBonusDTO.add(newSet);
        }
      }
    }
    return listOfBonusDTO;
  }

  public static List<PrerequisiteDTO> toPrerequisiteBonusDTO(
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

  public static Set<PrerequisiteDTO> toPrerequisiteToSelectDTO(
    Set<Prerequisite> listOfBonus
  ) {
    Set<PrerequisiteDTO> listOfBonusDTO = new HashSet<>();
    if (listOfBonus != null) {
      for (Prerequisite bonus : listOfBonus) {
        PrerequisiteDTO bonusDTO = new PrerequisiteDTO(bonus);
        listOfBonusDTO.add(bonusDTO);
      }
    }

    return listOfBonusDTO;
  }
}
