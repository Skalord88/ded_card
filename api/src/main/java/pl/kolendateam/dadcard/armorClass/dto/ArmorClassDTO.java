package pl.kolendateam.dadcard.armorClass.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorClassDTO {

    public int dextrityBonus;
    public int sizeBonus;
    public int armorBonus;
    public int shieldBonus;
    public int enhancementBonuses;
    public int deflectionBonuses;
    public int naturalArmor;
    public int dodgeBonus;

    public int ACTotal(ArmorClassDTO armorClassDTO) {
        return 10 +
                dextrityBonus +
                sizeBonus +
                armorBonus +
                shieldBonus +
                enhancementBonuses +
                deflectionBonuses +
                naturalArmor +
                dodgeBonus;
    }

}
