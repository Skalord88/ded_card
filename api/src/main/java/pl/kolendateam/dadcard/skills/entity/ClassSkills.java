package pl.kolendateam.dadcard.skills.entity;

import java.io.Serializable;
import java.util.HashMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.abilitys.entity.AbilityEnum;

@Getter
@Setter
@NoArgsConstructor
public class ClassSkills implements Serializable {

    short idSkill;
    String nameSkill;
    HashMap <String,Integer> fieldOfStudy;
    boolean classSkill;
    double skillRank;
    int skillDifferentBonus;
    AbilityEnum skillAbility;

    public void addStudyMapToSkill(Study studyOfClass) {
        fieldOfStudy.put(studyOfClass.getStudyName(),+0);
    }

    public void removeStudyFromKnowledge(HashMap<String, Integer> fieldOfStudy, String study) {
        fieldOfStudy.remove(study);
    }

}
