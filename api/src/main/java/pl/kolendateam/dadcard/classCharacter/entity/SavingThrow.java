package pl.kolendateam.dadcard.classCharacter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class SavingThrow {

    int fortitude;
    int reflex;
    int will;


    public int calculateFortitude(String sT){

            if(sT.charAt(0)=='h'){
                fortitude = 2;
            } else{
                fortitude = 0;
            }
        return fortitude;
    }

    public int calculateReflex(String sT){

            if(sT.charAt(1)=='h'){
                reflex = 2;
            } else{
                reflex = 0;
            }
        return reflex;
    }

    public int calculateWill(String sT){


            if(sT.charAt(2)=='h'){
                will = 2;
            } else{
                will = 0;
            }
        return will;
    }
    
}
