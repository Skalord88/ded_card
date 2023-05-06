package pl.kolendateam.dadcard.characterCard.entity;

import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

@Setter
@Getter
@NoArgsConstructor

public class Vitality {

    int life;
    HashMap <Integer,Integer> hitDices;
    int hitPoints;

    public Vitality createHPFirstLevel(int hitDice, Abilitys abilitys){

        Vitality vita = new Vitality();

        vita.setLife(abilitys.getConstitution());
        HashMap <Integer,Integer> vitaMap = new HashMap<Integer,Integer>();
        vitaMap.put(hitDice, 1);
        vita.setHitDices(vitaMap);
        vita.setHitPoints(hitDice+abilitys.bonusConstitution(abilitys));
        return vita;
        
    }

    public int hitPointsNewtLevel(int hitDice, Vitality vitality, Abilitys abilitys, int ecl) {

        int hP;

        if(ecl % 2 == 0){
            hP = vitality.hitPoints+(hitDice/2)+abilitys.bonusConstitution(abilitys);
        } else {
            hP = vitality.hitPoints+((hitDice/2)+1)+abilitys.bonusConstitution(abilitys);
        }
        return hP;

    }

}
