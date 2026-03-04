package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;

public class MapperArmorClass {

  public static ArmorClassDTO[] toArmorClassDTO(ArmorClass[] armorClass) {
    ArmorClassDTO[] armorClassDTOs = new ArmorClassDTO[armorClass.length];
    for (int i = 0; i < armorClass.length; i++) {
      armorClassDTOs[i] = new ArmorClassDTO(armorClass[i]);
    }
    return armorClassDTOs;
  }

  public static ArmorClass[] toArmorClass(ArmorClassDTO[] armorClass) {
    ArmorClass[] armorClasses = new ArmorClass[armorClass.length];
    for (int i = 0; i < armorClass.length; i++) {
      armorClasses[i] = new ArmorClass(armorClass[i]);
    }
    return armorClasses;
  }
}
