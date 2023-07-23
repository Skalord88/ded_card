package pl.kolendateam.dadcard.feats.entity;

import java.io.Serializable;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CharacterFeat implements Serializable{

    int id;
    Integer levelOfFeat;
    String characterFeatName;
    String characterFeatDescription;

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
}
