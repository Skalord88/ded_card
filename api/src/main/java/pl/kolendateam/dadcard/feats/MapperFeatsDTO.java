package pl.kolendateam.dadcard.feats;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.feats.dto.FeatsDTO;
import pl.kolendateam.dadcard.feats.entity.Feats;

public class MapperFeatsDTO {
    public static ArrayList<FeatsDTO> toFeatsDTO(List<Feats> feats){

        ArrayList<FeatsDTO> featsDTOList = new ArrayList<>();
        for (Feats feat : feats){
            FeatsDTO featsDTO = new FeatsDTO(feat);
            featsDTOList.add(featsDTO);
        }

        return featsDTOList;
    }
    
}
