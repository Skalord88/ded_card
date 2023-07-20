package pl.kolendateam.dadcard.classCharacter.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class SavingThrow {

    double fortitude;
    double reflex;
    double will;

    public SavingThrow(double fortitude, double reflex, double will) {
        this.fortitude = fortitude;
        this.reflex = reflex;
        this.will = will;
    }

    public int checkPrerequisiteST(SavingThrow sT) {

        if(fortitude >= sT.fortitude ||
            reflex >= sT.reflex ||
            will >= sT.will){
            return 1;
        }
        
        return 0;
    
    }
}
