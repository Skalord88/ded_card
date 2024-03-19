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
    int shieldBonus;
    int enhancementBonuses;
    int deflectionBonuses;
    int naturalArmor;
    int dodgeBonus;

    public boolean checkPrerequisiteAC(ArmorClass aC) {

        return aC.armorBonus > 0;

    }

}
