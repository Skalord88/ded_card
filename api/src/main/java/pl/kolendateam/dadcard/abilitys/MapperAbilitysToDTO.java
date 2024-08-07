package pl.kolendateam.dadcard.abilitys;

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

public class MapperAbilitysToDTO {

  public static AbilitysDTO toAbilityDTO(Abilitys abilitys) {
    AbilitysDTO abilitysDTO = new AbilitysDTO(
      abilitys.getStrength(),
      abilitys.getDextrity(),
      abilitys.getConstitution(),
      abilitys.getIntelligence(),
      abilitys.getWisdom(),
      abilitys.getCharisma()
    );

    return abilitysDTO;
  }
}
