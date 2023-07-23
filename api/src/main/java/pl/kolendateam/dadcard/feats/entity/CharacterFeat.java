package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.Gson;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.entity.ArmorClass;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
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

    public boolean checkPrerequisite(
        Feats feat,
        String subRace,
        SavingThrow savingThrow, ArmorClass armorClass,
        ArrayList<ClassSkills> classSkills, Abilitys abilitys,
        int bab,
        ArrayList<CharacterFeat> featsList) {

        Prerequisite p = new Gson().fromJson(feat.getPrerequisite(), Prerequisite.class);

        boolean checkPrerequisite = false;
        int ckeckTot = 0;
        int checkEvry = 0;

        if(p.getRace()!=null){
            ckeckTot++;
        }
        if(p.getSavingThrow()!=null){
            ckeckTot++;
        }
        if(p.getArmorClass()!=null){
            ckeckTot++;
        }
        if(p.getClassSkills()!=null){
            ckeckTot++;
        }
        if(p.getAbility()!=null){
            ckeckTot++;
        }
        if(bab >= p.getBab()){
            ckeckTot++;
        }
        if(p.getFeats()!=null){
            ckeckTot++;
        }

        if(p.getRace()!=null){
            for(String r : p.getRace()){
                if(subRace == r){
                    checkPrerequisite = true;
                    checkEvry++;
                }
            }
        }

        if(p.getSavingThrow()!=null){
            if(savingThrow.checkPrerequisiteST(p.getSavingThrow())){
                checkPrerequisite = true;
                checkEvry++;
            } else {
                checkPrerequisite = false;
            }
        }

        if(p.getArmorClass()!=null){
            if(armorClass.checkPrerequisiteAC(p.getArmorClass())){
                checkPrerequisite = true;
                checkEvry++;
            } else {
                checkPrerequisite = false;
            }
        }

        if(p.getClassSkills()!=null){
            int checkCS = 0;
            for(ClassSkills prerequisiteCS : p.getClassSkills()){
                for(ClassSkills cS : classSkills){
                    if(prerequisiteCS.getNameSkill().equals(cS.getNameSkill())
                    && prerequisiteCS.getSkillRank() >= cS.getSkillRank()
                    ){
                        checkCS++;
                    }
                }
            }
            if(checkCS == p.getClassSkills().size()){
                checkPrerequisite = true;
                checkEvry++;
            } else {
                checkPrerequisite = false;
            }
        }

        if(p.getAbility()!=null){
            if(abilitys.checkPrerequisiteAb(p.getAbility())){
                checkPrerequisite = true;
                checkEvry++;
            } else {
                checkPrerequisite = false;
            }
        }

        if(bab >= p.getBab()){
            checkPrerequisite = true;
            checkEvry++;
        } else {
                checkPrerequisite = false;
            }

        if(p.getFeats()!=null){
            int checkF = 0;
            for(String prerequisiteF : p.getFeats()){
                for(CharacterFeat f : featsList){
                    if(f.getCharacterFeatName().equals(prerequisiteF)){
                        checkF++;
                    }
                }
            }
            if(checkF == p.getFeats().length){
                checkPrerequisite = true;
                checkEvry++;
            } else {
                checkPrerequisite = false;
            }
        }

        if(checkPrerequisite && checkEvry==ckeckTot){
            return true;
        }
        return false;

    }
}
