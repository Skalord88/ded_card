package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperPrerequisiteBonus {

  public static List<Set<PrerequisiteDTO>> toPrerequisiteSetInListDTO(
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

  public static Set<PrerequisiteDTO> toPrerequisiteSetDTO(
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
  // public List<Object> toPrerequisiteObjectDTO(List<Prerequisite> listOfBonus) {
  //   List<Object> listOfBonusDTO = new ArrayList<>();
  //   if (listOfBonus != null) {
  //     for (Prerequisite bonus : listOfBonus) {

  // if (bonus.getType() == ModifierEnum.FEAT) {
  //   FeatsDTO featDTO = new FeatsDTO(bonus.getValue());
  //   listOfBonusDTO.add(featDTO);
  // }
  // if (bonus.getType() == ModifierEnum.ARMOR_TYPE) {
  //   PrerequisiteDTO armorType = new PrerequisiteDTO(bonus);
  //   listOfBonusDTO.add(armorType);
  // }
  // if (bonus.getType() == ModifierEnum.WEAPON_TYPE) {
  //   PrerequisiteDTO weaponType = new PrerequisiteDTO(bonus);
  //   listOfBonusDTO.add(weaponType);
  // }
  //     }
  //   }

  //   return listOfBonusDTO;
  // }
}
