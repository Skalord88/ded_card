package pl.kolendateam.dadcard.modifier;

import java.util.HashSet;
import java.util.Set;
import pl.kolendateam.dadcard.modifier.dto.ModifierBonusDTO;
import pl.kolendateam.dadcard.modifier.entity.ModifierType;
import pl.kolendateam.dadcard.race.dto.SpeedDTO;
import pl.kolendateam.dadcard.race.entity.Speed;

public class MapperModifierBonus {

  public static ModifierBonusDTO toModifierDTO(ModifierType mod) {
    if (mod != null) return new ModifierBonusDTO(mod);
    return new ModifierBonusDTO();
  }

  public static ModifierType[] toModifiers(ModifierBonusDTO[] mods) {
    if (mods != null) {
      ModifierType[] modifierArray = new ModifierType[mods.length];
      for (int i = 0; i < mods.length; i++) {
        modifierArray[i] = new ModifierType(mods[i]);
      }
      return modifierArray;
    }
    return new ModifierType[0];
  }

  public static ModifierBonusDTO[] toModifiersDTO(ModifierType[] mods) {
    if (mods != null) {
      ModifierBonusDTO[] modifierArray = new ModifierBonusDTO[mods.length];
      for (int i = 0; i < mods.length; i++) {
        modifierArray[i] = new ModifierBonusDTO(mods[i]);
      }
      return modifierArray;
    }
    return new ModifierBonusDTO[0];
  }

  public static Set<ModifierBonusDTO> toSetModifierDTO(Set<ModifierType> mods) {
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

  public static Set<ModifierType> toListModifier(Set<ModifierBonusDTO> mods) {
    Set<ModifierType> listOfModifier = new HashSet<>();
    if (mods != null) {
      mods.forEach(mod -> {
        if (mod != null) {
          ModifierType m = new ModifierType(mod);
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
