package pl.kolendateam.dadcard.skills.dto;

import jakarta.validation.constraints.Min;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

public class SkillsDTO {

    public int idSkill;
    public String nameSkill;
    public boolean classSkill;
    public int skillRank;
    public int skillAbility;
    public int skillBonus;
    public AbilityEnum ability;

    @Min(0)
    public int rankToAdd;

    
}
