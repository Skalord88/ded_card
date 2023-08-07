package pl.kolendateam.dadcard.skills.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

public class SkillsDTO {

    @NotNull
    public int idSkill;
    public String nameSkill;
    public boolean classSkill;

    @PositiveOrZero
    public double skillRank;
    
    @NotNull
    public int skillAbility;

    public int skillBonus;
    public AbilityEnum ability;
    
}
