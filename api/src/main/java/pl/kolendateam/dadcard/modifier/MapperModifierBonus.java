package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.ModifierBonusDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;
import pl.kolendateam.dadcard.race.entity.Speed;

public class MapperModifierBonus {

  public static ModifierBonusDTO toModifierDTO(ModifierBonus mod) {
    if (mod != null) return new ModifierBonusDTO(mod);
    return new ModifierBonusDTO();
  }

  public static ModifierBonus[] toModifiers(ModifierBonusDTO[] mods) {
    if (mods != null) {
      ModifierBonus[] modifierArray = new ModifierBonus[mods.length];
      for (int i = 0; i < mods.length; i++) {
        modifierArray[i] = new ModifierBonus(mods[i]);
      }
      return modifierArray;
    }
    return new ModifierBonus[0];
  }

  public static ModifierBonusDTO[] toModifiersDTO(ModifierBonus[] mods) {
    if (mods != null) {
      ModifierBonusDTO[] modifierArray = new ModifierBonusDTO[mods.length];
      for (int i = 0; i < mods.length; i++) {
        modifierArray[i] = new ModifierBonusDTO(mods[i]);
      }
      return modifierArray;
    }
    return new ModifierBonusDTO[0];
  }

  public static Set<ModifierBonusDTO> toSetModifierDTO(
    Set<ModifierBonus> mods
  ) {
    Set<ModifierBonusDTO> listOfModifierDTO = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        if (mod != null) {
          ModifierBonusDTO modDTO = new ModifierBonusDTO(mod);
          listOfModifierDTO.add(modDTO);
        }
      });
    }
    return listOfModifierDTO;
  }

  public static Set<ModifierBonus> toListModifier(Set<ModifierBonusDTO> mods) {
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
