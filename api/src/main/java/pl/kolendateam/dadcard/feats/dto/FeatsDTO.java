package pl.kolendateam.dadcard.feats.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;

@NoArgsConstructor
@AllArgsConstructor
public class FeatsDTO {

    public int id;
    public String featName;
    public FeatsTypeEnum featsType;
    public String prerequisite;
    public String description;

    public FeatsDTO(Feats feats){
        this.id = feats.getId();
        this.featName = feats.getFeatName();
        this.featsType = feats.getFeatsType();
        this.prerequisite = feats.getPrerequisite();
        this.description = feats.getDescription();
    }
    
}
