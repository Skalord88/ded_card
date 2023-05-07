package pl.kolendateam.dadcard.armorClass.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArmorClass implements Serializable {

    int dextrityBonus;
    int sizeBonus;
    int armorBonus;
    int shildBonus;
    int enhancementBonuses;
    int deflectionBonuses;
    int naturalArmor;
    int dodgeBonus;
    
}
