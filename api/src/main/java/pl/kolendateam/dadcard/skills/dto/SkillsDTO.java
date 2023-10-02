package pl.kolendateam.dadcard.skills.dto;

import java.util.HashMap;

import pl.kolendateam.dadcard.skills.entity.Study;

public class SkillsDTO {

    public int idSkill;
    public String nameSkill;
    public HashMap <Study,Integer> fieldOfStudy;
    public boolean classSkill;
    public double skillRank;
    public int skillAbility;
    public int skillBonus;
    
}
