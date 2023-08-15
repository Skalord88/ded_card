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
        int bonusStreght = (int)(abilitys.getStreght()-10)/2;
        return bonusStreght;
    }

    public int bonusDextrity (Abilitys abilitys){
        int bonusDextrity = (int)(abilitys.getDextrity()-10)/2;
        return bonusDextrity;
    }

    public int bonusConstitution (Abilitys abilitys){
        int bonusConstitution = (abilitys.getConstitution()-10)/2;
        return bonusConstitution;
    }

    public int bonusIntelligence (Abilitys abilitys){
        int bonusIntelligence = (int)(abilitys.getIntelligence()-10)/2;
        return bonusIntelligence;
    }

    public int bonusWisdom (Abilitys abilitys){
        int bonusWisdom = (int)(abilitys.getWisdom()-10)/2;
        return bonusWisdom;
    }
    public int bonusCharisma (Abilitys abilitys){
        int bonusCharisma = (int)(abilitys.getCharisma()-10)/2;
        return bonusCharisma;
    }

    public Abilitys addRaceAbilitys(Abilitys jsonObjectAbilitys, Abilitys abilitys) {

        abilitys.streght += jsonObjectAbilitys.streght;
        abilitys.dextrity += jsonObjectAbilitys.dextrity;
        abilitys.constitution += jsonObjectAbilitys.constitution;
        abilitys.intelligence += jsonObjectAbilitys.intelligence;
        abilitys.wisdom += jsonObjectAbilitys.wisdom;
        abilitys.charisma += jsonObjectAbilitys.charisma;
        
        return abilitys;
    }

    public boolean checkPrerequisiteAb(Abilitys ab) {

        if(streght >= ab.streght &&
            dextrity >= ab.dextrity &&
            constitution >= ab.constitution &&
            intelligence >= ab.intelligence &&
            wisdom >= ab.wisdom &&
            charisma >= ab.charisma
        ){
            return true;
        }
        return false;
    }
    
}
