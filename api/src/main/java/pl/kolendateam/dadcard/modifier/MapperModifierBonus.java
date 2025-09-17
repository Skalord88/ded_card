package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;
import pl.kolendateam.dadcard.race.entity.Speed;

public class MapperModifierBonus {

  public static ModifierDTO toModifierDTO(ModifierBonus mod) {
    if (mod != null) return new ModifierDTO(mod);
    return new ModifierDTO();
  }

  public static Set<ModifierDTO> toSetModifierDTO(Set<ModifierBonus> mods) {
    Set<ModifierDTO> listOfModifierDTO = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        if (mod != null) {
          ModifierDTO modDTO = new ModifierDTO(mod);
          listOfModifierDTO.add(modDTO);
        }
      });
    }
    return listOfModifierDTO;
  }

  public static Set<ModifierBonus> toListModifier(Set<ModifierDTO> mods) {
    Set<ModifierBonus> listOfModifier = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        if (mod != null) {
          ModifierBonus m = new ModifierBonus(mod);
          listOfModifier.add(m);
        }
      });
    }
    return listOfModifier;
  }

  public static SpeedDTO toSpeedDTO(Speed speed) {
    if (speed == null) return null;
    return new SpeedDTO(speed);
  }

  public static Speed toSpeed(SpeedDTO speed) {
    if (speed == null) return null;
    return new Speed(speed);
  }
}
