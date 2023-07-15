package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;

@NoArgsConstructor
@AllArgsConstructor
public class CharacterFeatsDTO {

    public String characterFeatName;
    public String characterFeatSpecial;
    public String characterFeatDescription;

    public CharacterFeatsDTO(CharacterFeat characterFeats){
        this.characterFeatName = characterFeats.getCharacterFeatName();
        this.characterFeatSpecial = switch(characterFeats.getCharacterFeatName()){
            case "Rage" -> 
                characterFeats.getLevelOfFeat()+"/day";
            case "Trap sense" -> 
                "+"+characterFeats.getLevelOfFeat();
            case "Damage reduction" ->
                "DR"+characterFeats.getLevelOfFeat();
            default -> null;
        };
        this.characterFeatDescription = characterFeats.getCharacterFeatDescription();
    }    
}
