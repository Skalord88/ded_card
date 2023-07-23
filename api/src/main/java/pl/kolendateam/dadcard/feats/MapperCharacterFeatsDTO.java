package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.HashSet;

import pl.kolendateam.dadcard.feats.dto.CharacterFeatsDTO;
import pl.kolendateam.dadcard.feats.entity.CharacterFeat;

public class MapperCharacterFeatsDTO {
    public static HashSet<CharacterFeatsDTO> toCharacterFeatsDTO(ArrayList<CharacterFeat> feats){

        HashSet<CharacterFeatsDTO> featsDTOList = new HashSet<>();
        for (CharacterFeat feat : feats){
            CharacterFeatsDTO featsDTO = new CharacterFeatsDTO(feat);
            featsDTOList.add(featsDTO);
        }

        return featsDTOList;
    }
    
}
