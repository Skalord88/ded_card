package pl.kolendateam.dadcard.modifier;

import java.util.ArrayList;
import java.util.List;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

public class MapperModifierBonusDTO {

  public static ModifierDTO toModifierDTO(ModifierBonus mod) {
    return new ModifierDTO(mod);
  }

  public static List<ModifierDTO> toListModifierDTO(List<ModifierBonus> mods) {
    List<ModifierDTO> listOfModifierDTO = new ArrayList<>();
    mods.forEach(mod -> {
      ModifierDTO modDTO = new ModifierDTO(mod);
      listOfModifierDTO.add(modDTO);
    });
    return listOfModifierDTO;
  }
}
