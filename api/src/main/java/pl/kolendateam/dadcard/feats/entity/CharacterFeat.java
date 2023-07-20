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

        for(String r : p.getRace()){
            if(subRace == r){
                return 1;
            }
        }
        if(p.getSize().equals(size.getSize())){
            return 1;
        }
        if(savingThrow.checkPrerequisiteST(p.getSavingThrow())==1){
            return 1;
        }
        if(armorClass.checkPrerequisiteAC(p.getArmorClass())==1){
            return 1;
        }
        int checkCS = 0;
        for(ClassSkills prerequisiteCS : p.getClassSkills()){
            for(ClassSkills cS : classSkills){
                if(prerequisiteCS.getNameSkill().equals(cS.getNameSkill())){
                    checkCS++;
                }
            }
        }
        if(checkCS == p.getClassSkills().size()){
            return 1;
        }
        if(abilitys.checkPrerequisiteAb(p.getAbility())==1){
            return 1;
        }

        // p.getSpecialAttacks(),

        if(bab >= p.getBab()){
            return 1;
        }
        
        // p.getSkill(),
        // p.getFeats()

        return 0;

    }
}
