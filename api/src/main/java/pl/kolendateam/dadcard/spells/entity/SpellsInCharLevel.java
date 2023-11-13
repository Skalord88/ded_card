package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;

@Getter
@Setter
@NoArgsConstructor
public class SpellsInCharLevel implements Serializable {

    EnumClass caster;
    HashMap <Integer, ArrayList<Integer>> spells;

    public SpellsInCharLevel(EnumClass caster) {
        this.caster = caster;
        this.spells = new HashMap<>();
    }

    public int getSpellIndex(int spell) {
        
        for(int i = 0; i == this.spells.keySet().size(); i++){
            if(this.spells.get(i).forEach((i, s) -> {

            });
                return i;
            }
        } return -1;
    }

}
