package pl.kolendateam.dadcard.attack.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class SpecialAttacks implements Serializable{

    int bullRush;
    int charge;
    int disarm;
    int grapple;
    int overrun;
    int sunder;

    public SpecialAttacks addSpecialAttackFeat(SpecialAttacks spAtt, SpecialAttacks characterSpecialAttacks) {

        characterSpecialAttacks.bullRush += spAtt.bullRush;
        characterSpecialAttacks.charge += spAtt.charge;
        characterSpecialAttacks.disarm += spAtt.disarm;
        characterSpecialAttacks.grapple += spAtt.grapple;
        characterSpecialAttacks.overrun += spAtt.overrun;
        characterSpecialAttacks.sunder += spAtt.sunder;

        return characterSpecialAttacks;

    }
    
}
