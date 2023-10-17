package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class SpellsDTO {

    
    public String name;
    //public SpellsEnum[] school;
    public String school;
    public String level;

    public SpellsDTO(Spells spell) {
        this.name = spell.getName();
        this.school = spell.getSchool();
        this.level = spell.getLevel();
    }
    
}
