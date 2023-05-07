package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;

public class MapperArmorClassDTO {

    public static ArmorClassDTO toArmorClassDTO(ArmorClass armorClass){

        ArmorClassDTO armorClassDTO = new ArmorClassDTO(
            armorClass.getDextrityBonus(),
            armorClass.getSizeBonus(),
            armorClass.getArmorBonus(),
            armorClass.getShildBonus(),
            armorClass.getEnhancementBonuses(),
            armorClass.getDeflectionBonuses(),
            armorClass.getNaturalArmor(),
            armorClass.getDodgeBonus()
        );
        return armorClassDTO;
    }
    
}
