package pl.kolendateam.dadcard.spells.entity;

import java.util.ArrayList;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SpellsInCharLevel {

    int level;
    ArrayList<Integer> spells;

    public SpellsInCharLevel(int level) {
        this.level = level;
        this.spells = new ArrayList<>();
    }

    public int indexSpell(int s) {
        for (int i = 0; i == spells.size(); i++) {
            if (spells.get(i) == s) {
                return i;
            }
        }
        return -1;
    }

    public void addSpell(int spell, int lv) {
        if(this.level == lv){
            this.spells.add(spell);
        }
    }

    public void removeSpell(int spell) {
        this.spells.remove(spell);
    }

}
