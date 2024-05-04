package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.MapperSpellsDTO;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class SpellsDTO {

  public int id;
  public String name;
  public SpellsEnum[] school;
  public SpellLevel[] level;
  public SpellsEnum[] components;
  public SpellsEnum castingTime;
  public SpellsEnum range;
  public String target;
  public String area;
  public String effect;
  public String duration;
  public String savingThrow;
  public String spellResistance;
  public String descriptiveText;

  public SpellsDTO(Spells spell) {
    this.id = spell.getId();
    this.name = spell.getName();
    this.school = MapperSpellsDTO.toSpellEnumArray(spell.getSchool());
    this.level = MapperSpellsDTO.toSpellLevelArray(spell.getLevel());
    this.components = MapperSpellsDTO.toSpellEnumArray(spell.getComponents());
    this.castingTime = spell.getCastingTime();
    this.range = spell.getRange();
    this.target = spell.getTarget();
    this.area = spell.getArea();
    this.effect = spell.getEffect();
    this.duration = spell.getDuration();
    this.savingThrow = spell.getSavingThrow();
    this.spellResistance = spell.getSpellResistance();
    this.descriptiveText = spell.getDescriptiveText();
  }
}
