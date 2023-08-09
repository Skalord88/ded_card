package pl.kolendateam.dadcard.skills.entity;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@Getter
@Setter

public class ClassSkills {

    int idSkill;
    String nameSkill;
    boolean classSkill;
    double skillRank;
    int skillDifferentBonus;
    AbilityEnum skillAbility;


    public void addSkillRank(){
        skillRank++;
    }

    public void addSkillRankFalse(){
        skillRank+=0.5;
    }

    public void minusSkillRank(){
        skillRank--;
    }

    public void minusSkillRankFalse(){
        skillRank-=0.5;
    }

}
