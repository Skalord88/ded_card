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
    
    public int checkPrerequisiteAC(ArmorClass aC) {

        if(aC.armorBonus > 0){
            return 1;
        }
        return 0;
    }
    
}
