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

    public void addSTFortitude(double bonus){
        this.fortitude =+ bonus;
    }

    public void incementSTFortitude(){
        this.fortitude =+ 0.5;
    }

    public void addSTReflex(double bonus){
        this.reflex =+ bonus;
    }

    public void incementSTReflex(){
        this.reflex =+ 0.5;
    }

    public void addSTWill(double bonus){
        this.will =+ bonus;
    }

    public void incementSTWill(){
        this.will =+ 0.5;
    }
}
