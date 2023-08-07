package pl.kolendateam.dadcard.skills.dto;

import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

public class SkillListDTO {

    public int idSkill;
    public String nameSkill;
    public AbilityEnum ability;

    public SkillListDTO(int id, String name, AbilityEnum abilityEn){

        this.idSkill = id;
        this.nameSkill = name;
        this.ability = abilityEn;

    }
    
}
