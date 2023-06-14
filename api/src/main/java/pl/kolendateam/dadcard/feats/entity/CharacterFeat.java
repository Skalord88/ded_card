package pl.kolendateam.dadcard.feats.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CharacterFeat{

    int levelOfFeat;
    String characterFeatName;
    String characterFeatSpecial;
    String characterFeatDescription;

    public void incrementLevelOfFeat(){
        this.levelOfFeat +=1;
    }

    public void firstFeatInList(Feats featInDB){
        
        characterFeatName = featInDB.getFeatName();
        characterFeatSpecial = featInDB.getFeatSpecial();
        characterFeatDescription = featInDB.getDescription();

    }

    public void characterFeatSpecialCheck() {
        
        switch (characterFeatName){
            case "Rage":
            levelOfFeat +=1;
            characterFeatSpecial = levelOfFeat+"/day";
            break;
            case "Trap sense":
            levelOfFeat +=1;
            this.characterFeatSpecial = "+"+levelOfFeat;
            break;
            } 
        }
    
}
