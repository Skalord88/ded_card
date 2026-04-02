package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.SpecialAbilitiesDTO;
import pl.kolendateam.dadcard.modifier.entity.SpecialAbilities;

public class MapperSpecialAbilities {

  public static Set<SpecialAbilitiesDTO> toSpecialAbilitiesDTOSet(
    Set<SpecialAbilities> spABs
  ) {
    if (spABs == null || spABs.isEmpty()) {
      return null;
    }
    Set<SpecialAbilitiesDTO> listofSADTO = new HashSet<>();
    if (spABs != null) {
      spABs.forEach(sA -> {
        if (sA != null) {
          SpecialAbilitiesDTO modDTO = new SpecialAbilitiesDTO(sA);
          listofSADTO.add(modDTO);
        }
      });
    }
    return listofSADTO;
  }

  public static Set<SpecialAbilities> toSpecialAbilitiesSet(
    Set<SpecialAbilitiesDTO> specialAttacksDTO
  ) {
    Set<SpecialAbilities> listofSA = new HashSet<>();
    if (specialAttacksDTO != null) {
      specialAttacksDTO.forEach(sA -> {
        if (sA != null) {
          SpecialAbilities mod = new SpecialAbilities(sA);
          listofSA.add(mod);
        }
      });
    }
    return listofSA;
  }

  public static SpecialAbilitiesDTO toSpecialAbilityDTO(
    SpecialAbilities specialAttacks
  ) {
    return specialAttacks != null
      ? new SpecialAbilitiesDTO(specialAttacks)
      : null;
  }
}
