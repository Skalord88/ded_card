package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

public class MapperModifierBonus {

  public static ModifierDTO toModifierDTO(ModifierBonus mod) {
    if (mod != null) return new ModifierDTO(mod);
    return new ModifierDTO();
  }

  public static Set<ModifierDTO> toListModifierDTO(Set<ModifierBonus> mods) {
    Set<ModifierDTO> listOfModifierDTO = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        ModifierDTO modDTO = new ModifierDTO(mod);
        listOfModifierDTO.add(modDTO);
      });
    }
    return listOfModifierDTO;
  }

  public static Set<ModifierBonus> toListModifier(Set<ModifierDTO> mods) {
    Set<ModifierBonus> listOfModifier = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        ModifierBonus m = new ModifierBonus(mod);
        listOfModifier.add(m);
      });
    }
    return listOfModifier;
  }
}
