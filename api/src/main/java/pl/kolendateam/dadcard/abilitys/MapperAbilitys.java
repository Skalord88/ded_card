package pl.kolendateam.dadcard.abilitys;

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.dto.LevelAbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.abilitys.entity.LevelAbilitys;

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

  public static LevelAbilitys toLevelAbility(
    LevelAbilitysDTO levelAbilitysDTO
  ) {
    if (levelAbilitysDTO != null) {
      return new LevelAbilitys(
        levelAbilitysDTO.level,
        levelAbilitysDTO.abilitys
      );
    }
    return new LevelAbilitys();
  }

  public static LevelAbilitysDTO toLevelAbilityDTO(
    LevelAbilitys levelAbilitys
  ) {
    if (levelAbilitys != null) {
      return new LevelAbilitysDTO(
        levelAbilitys.getLevel(),
        levelAbilitys.getAbilitys()
      );
    }
    return new LevelAbilitysDTO();
  }
}
