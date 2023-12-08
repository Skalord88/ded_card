package pl.kolendateam.dadcard.skills.dto;

import java.util.HashMap;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SkillsDTO {

    public short idSkill;
    public String nameSkill;
    public HashMap <String,Integer> fieldOfStudy;
    public boolean classSkill;
    public double skillRank;
    public int skillAbility;
    public int skillBonus;

    public SkillsDTO(short id, String name) {
        this.idSkill = id;
        this.nameSkill = name;
    }
    
}
