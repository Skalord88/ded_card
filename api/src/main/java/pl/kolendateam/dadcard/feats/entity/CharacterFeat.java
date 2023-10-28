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

    short id;
    Integer levelOfFeat;
    String characterFeatName;
    String characterFeatDescription;
    FeatsTypeEnum featsType;

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
    public void decrementLevelFeat(){
        this.levelOfFeat--;
    }

    public boolean checkPrerequisite(
        Feats feat,
        String subRace,
        SavingThrow savingThrow, ArmorClass armorClass,
        ArrayList<ClassSkills> classSkills, Abilitys abilitys,
        int bab,
        ArrayList<CharacterFeat> featsList) {

        Prerequisite p = new Gson().fromJson(feat.getPrerequisite(), Prerequisite.class);

        int ckeckTot = 0;
        int checkEvry = 0;

        if(p.getRace()!=null){
            ckeckTot++;
            for(String r : p.getRace()){
                if(subRace == r){
                    checkEvry++;
                }
            }
        }

        if(p.getSavingThrow()!=null){
            ckeckTot++;
            if(savingThrow.checkPrerequisiteST(p.getSavingThrow())){
                checkEvry++;
            }
        }

        if(p.getArmorClass()!=null){
            ckeckTot++;
            if(armorClass.checkPrerequisiteAC(p.getArmorClass())){
                checkEvry++;
            }
        }

        if(p.getClassSkills()!=null){
            ckeckTot++;
            int checkCS = 0;
            for(ClassSkills prerequisiteCS : p.getClassSkills()){
                for(ClassSkills cS : classSkills){
                    if(prerequisiteCS.getNameSkill().equals(cS.getNameSkill())
                    && prerequisiteCS.getSkillRank() <= cS.getSkillRank()
                    ){
                        checkCS++;
                    }
                }
            }
    
        if(checkCS == p.getClassSkills().size()){
            checkEvry++;
            }
        }
        if(p.getAbility()!=null){
            ckeckTot++;
            if(abilitys.checkPrerequisiteAb(p.getAbility())){
                checkEvry++;
            }
        }

        if(bab >= p.getBab()){
            ckeckTot++;
            checkEvry++;
        }

        if(p.getFeats()!=null){
            ckeckTot++;
            int checkF = 0;
            for(String prerequisiteF : p.getFeats()){
                for(CharacterFeat f : featsList){
                    if(f.getCharacterFeatName().equals(prerequisiteF)){
                        checkF++;
                    }
                }
            }
            if(checkF == p.getFeats().length){
                checkEvry++;
            }
        }

        return checkEvry==ckeckTot;

    }

    public String wildShape(int levelOfFeat){

        if(levelOfFeat < 4){
            return levelOfFeat + "/day";
        }
        if(levelOfFeat == 4){
            return "3/day (Large)";
        }
        if(levelOfFeat == 5){
            return "4/day (Large)";
        }
        if(levelOfFeat == 6){
            return "4/day (Large and Tiny)";
        }
        if(levelOfFeat == 7){
            return "4/day (Large, Tiny and plant)";
        }
        if(levelOfFeat == 8){
            return "5/day (Large, Tiny and plant)";
        }
        if(levelOfFeat == 9){
            return "5/day (Large, Tiny, Huge and plant)";
        }
        if(levelOfFeat == 10){
            return "5/day (Large, Tiny, Huge and plant), 1/day (elemental)";
        }
        if(levelOfFeat == 11){
            return "6/day (Large, Tiny, Huge and plant), 2/day (elemental)";
        }
        if(levelOfFeat >= 12){
            return "6/day (Large, Tiny, Huge and plant), 3/day (Huge elemental)";
        }

        return "";

    }

    public String flurryOfBlows(int levelOfFeat) {
        String stringFeatSpecial = switch(levelOfFeat) {
            case 1 -> "-2/-2";
            case 2 -> "-1/-1";
            case 3 -> "+0/+0";
            case 4 -> "+1/+1";
            case 5 -> "+2/+2";
            case 6 -> "+3/+3";
            case 7 -> "+4/+4";
            case 8 -> "+5/+5/+0";
            case 9 -> "+6/+6/+1";
            case 10 -> "+7/+7/+2";
            case 11 -> "+8/+8/+8/+3";
            case 12 -> "+9/+9/+9/+4";
            case 13 -> "+9/+9/+9/+4";
            case 14 -> "+10/+10/+10/+5";
            case 15 -> "+11/+11/+11/+6/+1";
            case 16 -> "+12/+12/+12/+7/+2";
            case 17 -> "+12/+12/+12/+7/+2";
            case 18 -> "+13/+13/+13/+8/+3";
            case 19 -> "+14/+14/+14/+9/+4";
            case 20 -> "+15/+15/+15/+10/+5";
            default -> "";
        };
        
        return stringFeatSpecial;
    }

    public String unarmedStrike(int levelOfFeat) {
        if(levelOfFeat < 4){
            return "1d" + (5 + levelOfFeat * 2 - 1);
        } else {
            return "2d" + ((levelOfFeat -1) * 2);
        }
    }

    public String aCBonus(int levelOfFeat) {
        return "AC bonus +" + (levelOfFeat-1);
    }

    public String fastMovement(int levelOfFeat) {
        return "+" + (levelOfFeat-1)*10+ "ft.";
    }

        public String slowFall(int levelOfFeat) {
        if (levelOfFeat < 9) {
            return "+" + (10 + 10 * levelOfFeat) + "ft";
        } else {
            return "any distance";
        }
    }

        public String kiStrike(int levelOfFeat) {
            String stringFeatSpecial = "magic";
        if(levelOfFeat > 1){
            stringFeatSpecial = "magic and lawfull";
        }
        if(levelOfFeat > 2){
            stringFeatSpecial = "magic, lawfull and adamantine";
        }
            return stringFeatSpecial;
        }

        public String favoredEnemy(int levelOfFeat) {
        if(levelOfFeat == 1){
            return "1st favored enemy";
        } else if (levelOfFeat == 2) {
            return "2nd favored enemy";
        } else if(levelOfFeat == 3){
            return "3rd favored enemy";
        } else {
            return levelOfFeat + "th favored enemy";
        }
    }
    
}
