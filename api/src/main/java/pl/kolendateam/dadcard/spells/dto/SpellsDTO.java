package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class SpellsDTO {

    public String name;
    public SpellsEnum[] school;
    public SpellLevel[] level;
    public SpellsEnum[] components;
    public SpellsEnum castingTime;
    public SpellsEnum range;
    public String target;
    public String effect;
    public SpellsEnum duration;
    public SpellsEnum savingThrow;
    public SpellsEnum spellResistance;
    public String descriptiveText;

    public SpellsDTO(Spells spell) {
        this.name = spell.getName();
        this.school = MapperSpellsDTO.toSpellEnumArray(spell.getSchool());
        this.level = MapperSpellsDTO.toSpellLevelArray(spell.getLevel());
    }
    
}
