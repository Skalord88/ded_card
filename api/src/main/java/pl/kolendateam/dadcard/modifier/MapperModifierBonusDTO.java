package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

public class MapperModifierBonusDTO {

  public static ModifierDTO toModifierDTO(ModifierBonus mod) {
    return new ModifierDTO(mod);
  }

  public static Set<ModifierDTO> toListModifierDTO(Set<ModifierBonus> mods) {
    Set<ModifierDTO> listOfModifierDTO = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        ModifierDTO modDTO = new ModifierDTO(mod);
        listOfModifierDTO.add(modDTO);
      });
      return listOfModifierDTO;
    }
    return listOfModifierDTO;
  }
}
