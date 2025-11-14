package pl.kolendateam.dadcard.spells.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kolendateam.dadcard.spells.MapperSpells;
import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.Spells;

@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SpellsDTO {

  public int id;
  public String name;
  // public SpellsEnum[] school;
  public String school;
  public String subschool;
  public String descriptor;
  public SpellLevel[] level;
  // public SpellLevelDTO[] level;
  // public String level;
  // public SpellsEnum[] components;
  public String components;
  // public SpellsEnum castingTime;
  public String castingTime;
  // public SpellsEnum range;
  public String range;
  // public String target;
  // public String area;
  // public String effect;
  public String targetEffectArea;
  public String duration;
  public String savingThrow;
  public String spellResistance;
  public String descriptiveText;
  public String materialComponent;
  public String focus;
  public String xpCost;

  public SpellsDTO(Spells spell) {
    this.id = spell.getId();
    this.name = spell.getName();
    // this.school = MapperSpells.toSpellEnumArray(spell.getSchool());
    this.school = spell.getSchool();
    this.subschool = spell.getSubschool();
    this.descriptor = spell.getDescriptor();
    this.level = spell.getLevel() != null ? spell.getLevel() : null;
    // this.level = MapperSpells.toSpellLevelArray(spell.getLevel());
    // this.level = MapperSpells.toSpellLevelDTOs(spell.getLevel());
    // this.components = MapperSpells.toSpellEnumArray(spell.getComponents());
    this.components = spell.getComponents();
    this.castingTime = spell.getCastingTime();
    this.range = spell.getRange();
    // this.target = spell.getTarget();
    // this.area = spell.getArea();
    // this.effect = spell.getEffect();
    this.targetEffectArea = spell.getTargetEffectArea();
    this.duration = spell.getDuration();
    this.savingThrow = spell.getSavingThrow();
    this.spellResistance = spell.getSpellResistance();
    this.descriptiveText = spell.getDescriptiveText();
    this.materialComponent = spell.getMaterialComponent();
    this.focus = spell.getFocus();
    this.xpCost = spell.getFocus();
  }
}
