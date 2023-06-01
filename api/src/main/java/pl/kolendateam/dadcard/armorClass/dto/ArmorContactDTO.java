package pl.kolendateam.dadcard.armorClass.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorContactDTO {

    public int dextrityBonus;
    public int sizeBonus;
    public int deflectionBonuses;
    public int dodgeBonus;

    public int ArmorContactTotal(ArmorClassDTO armorClassDTO) {
        return 10+
        dextrityBonus+
        sizeBonus+
        deflectionBonuses+
        dodgeBonus;
    }
    
}
