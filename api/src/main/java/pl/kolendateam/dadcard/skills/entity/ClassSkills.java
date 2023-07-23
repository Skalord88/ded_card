package pl.kolendateam.dadcard.skills.entity;

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

}
