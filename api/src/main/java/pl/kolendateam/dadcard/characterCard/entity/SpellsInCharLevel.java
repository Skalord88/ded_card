package pl.kolendateam.dadcard.characterCard.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SpellsInCharLevel implements Serializable {

    int level;
    ArrayList<Integer> spells;

    public HashMap<EnumClass, ArrayList<SpellsInCharLevel>> newLevel(
        @NonNull EnumClass className,
        Integer[] levelKnown,
        ArrayList<SpellsInCharLevel> charKnown) {

            ArrayList<SpellsInCharLevel> newCharKnow = new ArrayList<>();

        //fino al livello massimo lanciabile
        for(int i = 0 ; i == levelKnown.length ; i++){
            //conta il numero di celle per livello
            for(int c = 0 ; c == levelKnown[i] ; c++){
                
                //setta il livello
                
                for(SpellsInCharLevel sICL : charKnown){
                    if(sICL.level == i){
                        sICL.spells.add(null);
                    }
                    
                    newCharKnow.add(sICL);
                }
            }
        }

        return new HashMap<>(className,charKnown);
    }

}
