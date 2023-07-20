package pl.kolendateam.dadcard.feats;

import com.google.gson.Gson;

import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperPrerequisiteDTO {
    public static PrerequisiteDTO toPrerequisiteDTO(String prerequisite){

        Gson gson = new Gson();
        Prerequisite prereq = gson.fromJson(prerequisite, Prerequisite.class);
        return new PrerequisiteDTO(
            prereq.getRace(),
            prereq.getAbility(),
            prereq.getBab(),
            prereq.getSkill(),
            prereq.getFeats()
        );
    }

}