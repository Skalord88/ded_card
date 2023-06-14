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

    String characterFeatName;
    String characterFeatSpecial;
    String characterFeatDescription;

    public void newFeatInList(Feats featInDB){
        
        characterFeatName = featInDB.getFeatName();
        characterFeatSpecial = featInDB.getFeatSpecial();
        characterFeatDescription = featInDB.getDescription();

    }

    public void characterFeatSpecialCheck() {

        int numberFeat;
        
        switch (characterFeatName){
            case "Rage":
            numberFeat = characterFeatSpecial.charAt(0);
            characterFeatSpecial = numberFeat+"/day";
            break;
            case "Trap sense":
            numberFeat = characterFeatSpecial.charAt(1);
            this.characterFeatSpecial = "+"+numberFeat;
            break;
            } 
        }
    
}
