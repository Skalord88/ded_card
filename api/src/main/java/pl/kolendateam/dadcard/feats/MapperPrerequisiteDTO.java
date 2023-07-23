package pl.kolendateam.dadcard.feats;

import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;

public class MapperPrerequisiteDTO {
    public static PrerequisiteDTO toPrerequisiteDTO(String prerequisite){

        Prerequisite p = new Prerequisite();

        p.jsonToPrerequisite(prerequisite);

        return new PrerequisiteDTO(
            // p.getRace(),
            // p.getSavingThrow(),
            // p.getArmorClass(),
            // p.getClassSkills(),
            // p.getAbility(),
            // p.getBab(),
            p.getFeats()
        );
    }

}