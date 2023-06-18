package pl.kolendateam.dadcard.feats.entity;

import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default;

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

    public void newFeat(Feats feat){
        levelOfFeat = 1;
        characterFeatName = feat.getFeatName();
        characterFeatSpecial = feat.getFeatSpecial();
        characterFeatDescription = feat.getDescription();
    }

    public void characterFeatSpecialCheck() {
        
        switch (characterFeatName){
            case "Rage" -> {
                levelOfFeat++;
                characterFeatSpecial = levelOfFeat+"/day";
            }
            case "Trap sense" -> {
                levelOfFeat++;
                characterFeatSpecial = "+"+levelOfFeat;
            }
            
            default -> levelOfFeat = 1;
        }
    }
    
}
