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

    // public int indexSpell(int s) {
    //     for (int i = 0; i == spells.size(); i++) {
    //         if (spells.get(i) == s) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // public void addSpell(int spell, int lv) {
    //     if(this.level == lv){
    //         this.spells.add(spell);
    //     }
    // }

    // public void removeSpell(int spell) {
    //     this.spells.remove(spell);
    // }

}
