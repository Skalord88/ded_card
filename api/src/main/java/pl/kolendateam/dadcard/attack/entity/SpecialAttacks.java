package pl.kolendateam.dadcard.attack.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SpecialAttacks {

    int bullRush;
    int charge;
    int disarm;
    int grapple;
    int overrun;
    int sunder;

    public void addSpecialAttackFeat(SpecialAttacks spAtt, SpecialAttacks specialAttacks) {

        specialAttacks.bullRush += spAtt.bullRush;
        specialAttacks.charge += spAtt.charge;
        specialAttacks.disarm += spAtt.disarm;
        specialAttacks.grapple += spAtt.grapple;
        specialAttacks.overrun += spAtt.overrun;
        specialAttacks.sunder += spAtt.sunder;

    }
    
}
