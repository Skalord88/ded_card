package pl.kolendateam.dadcard.abilitys;

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

public class MapperAbilitys {

  public static AbilitysDTO toAbilityDTO(Abilitys abilitys) {
    if (abilitys != null) {
      return new AbilitysDTO(
        abilitys.getStrength(),
        abilitys.getDexterity(),
        abilitys.getConstitution(),
        abilitys.getIntelligence(),
        abilitys.getWisdom(),
        abilitys.getCharisma(),
        abilitys.getModifierBonus()
      );
    }
    return new AbilitysDTO();
  }

  public static Abilitys toAbility(AbilitysDTO abilitysDTO) {
    if (abilitysDTO != null) {
      return new Abilitys(abilitysDTO);
    }
    return new Abilitys();
  }
}
