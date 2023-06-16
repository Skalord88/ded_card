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

    public void newFeatInList(Feats featInDB){
        levelOfFeat = 1;
        characterFeatName = featInDB.getFeatName();
        characterFeatSpecial = featInDB.getFeatSpecial();
        characterFeatDescription = featInDB.getDescription();

    }

    

    public void characterFeatSpecialCheck() {
        
        switch (characterFeatName){
            case "Rage":
            levelOfFeat++; 
            // numberFeat = characterFeatSpecial.charAt(0);
            characterFeatSpecial = levelOfFeat+"/day";
            break;
            case "Trap sense":
            levelOfFeat++;
            // numberFeat = characterFeatSpecial.charAt(1);
            this.characterFeatSpecial = "+"+levelOfFeat;
            break;
            } 
        }
    
}
