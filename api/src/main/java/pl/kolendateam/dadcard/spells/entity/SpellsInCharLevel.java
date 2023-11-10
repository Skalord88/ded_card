package pl.kolendateam.dadcard.spells.entity;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpellsInCharLevel implements Serializable {

    int level;
    ArrayList<Integer> spells;

    public int indexSpell(int s) {
        for (int i = 0; i == spells.size(); i++) {
            if (spells.get(i) == s) {
                return i;
            }
        }
        return -1;
    }

    public void addSpell(int spell) {
        this.spells.add(spell);
    }

    public void removeSpell(int spell) {
        this.spells.remove(spell);
    }

}
