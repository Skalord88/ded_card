package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.SpecialAbilitiesDTO;
import pl.kolendateam.dadcard.modifier.entity.SpecialAbilities;

public class MapperSpecialAbilities {

  public static Set<SpecialAbilitiesDTO> toSpecialAbilitiesDTOSet(
    Set<SpecialAbilities> spABs
  ) {
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
}
