package pl.kolendateam.dadcard.characterCard.entity;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Vitality {

    int life;
    HashMap <Integer,Integer> hitDices;
    int hitPoints;

    

    public Vitality(HashMap<Integer, Integer> hitDices) {
        this.hitDices = hitDices;
    }

    public Vitality createHPFirstLevel(int hD, Abilitys abilitys, Vitality vitality){

        life = abilitys.getConstitution();
        vitality.getHitDices().put(hD, +1);
        hitPoints = vitality.getHitPoints()+hD;

        return vitality;
    }

    public int incrementHitPoints(int increment, Vitality vitality){
        int hP = vitality.getHitPoints()+increment;
        return hP;
    }

    public int hitPointsAtNewLevel(int hitDice, Vitality vitality, Abilitys abilitys, int ecl) {

        int hP;

        if(ecl % 2 == 0){
            hP = vitality.hitPoints+(hitDice/2)+abilitys.bonusConstitution
            (abilitys);
        } else {
            hP = vitality.hitPoints+((hitDice/2)+1)+abilitys.bonusConstitution
            (abilitys);
        }
        return hP;

    }

    public Vitality setRaceLevelAdjustmentHP(int lvAdj, Vitality vitality, Abilitys abilitys) {
        Vitality vita = new Vitality();
        vita.life = abilitys.getConstitution();
        HashMap <Integer,Integer> vitaMap = new HashMap<Integer,Integer>();
        if(lvAdj==0){
            vita.setHitDices(vitaMap);
            vita.hitPoints = 0;
        } else {
            vitaMap.put(4, lvAdj);
            vita.setHitDices(vitaMap);
            int lvAdjNext = lvAdj-1;
            vita.hitPoints = 4+(lvAdjNext*2)+(lvAdjNext/2);
        }
        return vita;
    }
}
