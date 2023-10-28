package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperCharacterFeatSpecial;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;

@NoArgsConstructor
@AllArgsConstructor
public class CharacterFeatsDTO {

    public String characterFeatName;
    public String characterFeatSpecial;
    public String characterFeatDescription;

    public CharacterFeatsDTO(CharacterFeat characterFeats){
        this.characterFeatName = characterFeats.getCharacterFeatName();
        this.characterFeatSpecial = MapperCharacterFeatSpecial.toCharacterFeatSpecial(characterFeats);
        this.characterFeatDescription = characterFeats.getCharacterFeatDescription();
    }    
}
