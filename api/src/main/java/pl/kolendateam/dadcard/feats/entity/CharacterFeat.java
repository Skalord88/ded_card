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

    public void characterFeatSpecialCheck() {
        
        int specialFeatInt;
        
        switch (this.characterFeatName){
            case "Rage":
            specialFeatInt = this.characterFeatSpecial.charAt(0);
            specialFeatInt +=1;
            this.characterFeatSpecial = specialFeatInt+"/day";
            break;
            case "Trap sense":
            specialFeatInt = this.characterFeatSpecial.charAt(1);
            specialFeatInt +=1;
            this.characterFeatSpecial = "+"+specialFeatInt;
            break;
            }
        }
    
}
