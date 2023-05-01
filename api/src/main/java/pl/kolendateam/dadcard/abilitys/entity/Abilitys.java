package pl.kolendateam.dadcard.abilitys.entity;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Abilitys implements Serializable{
    
    int streght;
    int dextrity;
    int constitution;
    int intelligence;
    int wisdom;
    int charisma;

    public int bonusStreght (Abilitys abilitys){
        int bonusStreght = (abilitys.getStreght()-10)/2;
        return bonusStreght;
    }

    public int bonusDextrity (Abilitys abilitys){
        int bonusDextrity = (abilitys.getDextrity()-10)/2;
        return bonusDextrity;
    }

    public int bonusConstitution (Abilitys abilitys){
        int bonusConstitution = (abilitys.getConstitution()-10)/2;
        return bonusConstitution;
    }

    public int bonusIntelligence (Abilitys abilitys){
        int bonusIntelligence = (abilitys.getIntelligence()-10)/2;
        return bonusIntelligence;
    }

    public int bonusWisdom (Abilitys abilitys){
        int bonusWisdom = (abilitys.getWisdom()-10)/2;
        return bonusWisdom;
    }
    public int bonusCharisma (Abilitys abilitys){
        int bonusCharisma = (abilitys.getCharisma()-10)/2;
        return bonusCharisma;
    }
}
