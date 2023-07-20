package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.attack.entity.SpecialAttacks;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.size.entity.Size;
import pl.kolendateam.dadcard.skills.entity.ClassSkills;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CharacterFeat implements Serializable{

    int id;
    Integer levelOfFeat;
    String characterFeatName;
    String characterFeatDescription;

    public int findFeatIndexinArrayById(ArrayList<CharacterFeat> featPcList){
        for (int i = 0; i < featPcList.size(); i ++){
            if (this.id == featPcList.get(i).getId()){
                return i;
            }
        } return -1;
    }

    public void incrementLevelFeat(){
        this.levelOfFeat++;
    }

    public int checkPrerequisite(
        Feats feat, String subRace, Size size,
        SavingThrow savingThrow, ArmorClass armorClass,
        ArrayList<ClassSkills> classSkills, Abilitys abilitys,
        SpecialAttacks specialAttacks, int bab,
        ArrayList<CharacterFeat> featsList) {

        Prerequisite p = new Prerequisite();
        p.jsonToPrerequisite(feat.getPrerequisite());

        boolean check = false;

        for(String r : p.getRace()){
            if(subRace == r){
                check = true;
            }
        }
        if(p.getSize().equals(size.getSize())){
            check = true;
        }
        check = savingThrow.checkPrerequisiteST(p.getSavingThrow());

        if(check == true){
            return 1;
        }
        return 0;
    }
}
