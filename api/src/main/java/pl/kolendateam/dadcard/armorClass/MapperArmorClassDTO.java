package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;

public class MapperArmorClassDTO {

    public static ArmorClassDTO toArmorClassDTO(ArmorClass armorClass,Abilitys abilitys){

        ArmorClassDTO armorClassDTO = new ArmorClassDTO(
            abilitys.bonusDextrity(abilitys),
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
