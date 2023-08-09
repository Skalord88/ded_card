package pl.kolendateam.dadcard.skills.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

public class SkillsDTO {

    @NotNull(message = "choose one ability")
    public int idSkill;
    public String nameSkill;
    public boolean classSkill;

    @PositiveOrZero(message = "value should be positive or zero")
    public double skillRank;
    
    @NotNull
    public int skillAbility;

    public int skillBonus;
    public AbilityEnum ability;
    
}
