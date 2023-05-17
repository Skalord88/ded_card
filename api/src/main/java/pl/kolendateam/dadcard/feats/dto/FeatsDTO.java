package pl.kolendateam.dadcard.feats.dto;

import pl.kolendateam.dadcard.feats.entity.Feats;
import pl.kolendateam.dadcard.feats.entity.FeatsTypeEnum;

public class FeatsDTO {

    public String featName;
    public FeatsTypeEnum featsType;
    public String prerequisite;
    public String description;

    public FeatsDTO(Feats feats){
        this.featName = feats.getFeatName();
        this.featsType = feats.getFeatsType();
        this.prerequisite = feats.getPrerequisite();
        this.description = feats.getDescription();
    }
    
}
