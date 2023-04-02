package pl.kolendateam.dadcard.classCharacter.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class SavingThrow {

    int fortitudeInt;
    double fortitude;
    int reflexInt;
    double reflex;
    int willInt;
    double will;

    public SavingThrow(double fortitude, double reflex, double will) {
        this.fortitude = fortitude;
        this.reflex = reflex;
        this.will = will;
    }

    public void incrementSavingThrow(){
        this.fortitude =+0.5;
        this.reflex =+0.5;
        this.will =+0.5;
    }

    public void calculateFortitude(String stringSavingThrow){
        if(stringSavingThrow.charAt(0)=='h'){
            this.fortitude =+ 2.5;
        } else{
            this.fortitude =+ 0;
        }
        this.fortitudeInt = (int)this.fortitude; 
    }

    public void calculateReflex(String stringSavingThrow){
        if(stringSavingThrow.charAt(1)=='h'){
            this.reflex =+ 2.5;
        } else{
            this.reflex =+ 0;
        } 
        this.reflexInt = (int)this.reflex;
    }

    public void calculateWill(String stringSavingThrow){
        if(stringSavingThrow.charAt(2)=='h'){
            this.will =+ 2.5;
        } else{
            this.will =+ 0;
        }
        this.willInt = (int)this.will;
    }
    
}
