package pl.kolendateam.dadcard.abilitys;

import java.util.ArrayList;
import java.util.List;
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
        abilitys.getModifierType()
      );
    }
    return null;
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
      return new LevelAbilitys(levelAbilitysDTO);
    }
    return new LevelAbilitys();
  }

  public static LevelAbilitysDTO toLevelAbilityDTO(
    LevelAbilitys levelAbilitys
  ) {
    if (levelAbilitys != null) {
      return new LevelAbilitysDTO(levelAbilitys);
    }
    return new LevelAbilitysDTO();
  }

  public static List<LevelAbilitys> toListLevelAbility(
    List<LevelAbilitysDTO> listLvAbilitysDTO
  ) {
    List<LevelAbilitys> newListLvAb = new ArrayList<LevelAbilitys>();
    if (
      listLvAbilitysDTO == null || listLvAbilitysDTO.isEmpty()
    ) return newListLvAb;

    listLvAbilitysDTO.forEach(a -> {
      newListLvAb.add(new LevelAbilitys(a));
    });

    return newListLvAb;
  }
}
