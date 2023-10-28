package pl.kolendateam.dadcard.feats;

import com.google.gson.Gson;

import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperPrerequisiteDTO {
    public static PrerequisiteDTO toPrerequisiteDTO(String prerequisite){

        if(prerequisite!=null){
        Prerequisite p = new Gson().fromJson(prerequisite, Prerequisite.class);

            return new PrerequisiteDTO(
                p.getRace(),
                p.getSavingThrow(),
                p.getArmorClass(),
                p.getClassSkills(),
                p.getAbility(),
                p.getBab(),
                p.getFeats()
            );
        } return null;
    }
}