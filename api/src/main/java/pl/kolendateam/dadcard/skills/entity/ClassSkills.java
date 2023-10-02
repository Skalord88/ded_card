package pl.kolendateam.dadcard.skills.entity;

import java.util.HashMap;
import java.util.HashSet;

import lombok.Getter;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@Getter
@Setter

public class ClassSkills {

    short idSkill;
    String nameSkill;
    HashMap <Study,Integer> fieldOfStudy;
    boolean classSkill;
    double skillRank;
    int skillDifferentBonus;
    AbilityEnum skillAbility;

    public void addStudyMapToSkill(HashSet<Study> listOfStudyInSkill) {

        for(Study studyInSkill : listOfStudyInSkill){
            fieldOfStudy.put(studyInSkill, 0);
        }

    }

}
