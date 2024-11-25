package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;

public class MapperArmorClassDTO {

  public static ArmorClassDTO toArmorClassDTO(ArmorClass armorClass) {
    if (armorClass != null) return new ArmorClassDTO(
      armorClass.getSizeBonus(),
      armorClass.getArmorBonus(),
      armorClass.getShieldBonus(),
      armorClass.getEnhancementBonuses(),
      armorClass.getDeflectionBonuses(),
      armorClass.getNaturalArmor(),
      armorClass.getDodgeBonus()
    );
    return new ArmorClassDTO();
  }
}
