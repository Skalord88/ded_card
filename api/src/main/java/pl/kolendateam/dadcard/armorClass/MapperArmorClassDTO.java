package pl.kolendateam.dadcard.armorClass;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.size.entity.Size;

public class MapperArmorClassDTO {

    public static ArmorClassDTO toArmorClassDTO(ArmorClass armorClass, Abilitys abilitys, Size size) {

        ArmorClassDTO armorClassDTO = new ArmorClassDTO(
                abilitys.bonusDextrity(abilitys),
                size.getBonusAttackAc(),
                armorClass.getArmorBonus(),
                armorClass.getShieldBonus(),
                armorClass.getEnhancementBonuses(),
                armorClass.getDeflectionBonuses(),
                armorClass.getNaturalArmor(),
                armorClass.getDodgeBonus());
        return armorClassDTO;
    }

}
