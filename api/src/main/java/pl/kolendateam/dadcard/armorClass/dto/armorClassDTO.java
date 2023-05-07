package pl.kolendateam.dadcard.armorClass.dto;

import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.armorClass.entity.armorClass;

public class armorClassDTO {

    public int dextrityBonus;
    public int sizeBonus;
    public int armorBonus;
    public int shildBonus;
    public int enhancementBonuses;
    public int deflectionBonuses;
    public int naturalArmor;
    public int dodgeBonus;

    public ArmorClassDTO(ArmorClass armorClass){
        this.dextrityBonus = armorClass.getDextrityBonus();
    }
    
}
