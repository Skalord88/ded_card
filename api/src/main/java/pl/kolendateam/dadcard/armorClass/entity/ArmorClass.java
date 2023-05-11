package pl.kolendateam.dadcard.armorClass.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArmorClass {

    int sizeBonus;
    int armorBonus;
    int shildBonus;
    int enhancementBonuses;
    int deflectionBonuses;
    int naturalArmor;
    int dodgeBonus;

    public ArmorClass createArmorClass(){

        ArmorClass aC = new ArmorClass();

        return aC;
    }
    
}
