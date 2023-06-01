package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.dto.ArmorContactDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.size.entity.Size;

public class MapperContactArmorDTO {
    public static ArmorContactDTO toContactArmorDTO(ArmorClass armorClass,Abilitys abilitys,Size size){

        ArmorContactDTO armorContactDTO = new ArmorContactDTO(
            abilitys.bonusDextrity(abilitys),
            size.getBonusAttackAc(),
            armorClass.getDeflectionBonuses(),
            armorClass.getDodgeBonus()
        );
        return armorContactDTO;
    }
}
