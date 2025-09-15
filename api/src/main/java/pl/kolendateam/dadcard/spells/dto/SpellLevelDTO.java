package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;

public class SpellLevelDTO {

  public int level;
  public SpellsEnum classDomain;

  public SpellLevelDTO(SpellLevel spellLevel) {
    this.level = spellLevel.getLevel();
    this.classDomain = spellLevel.getClassDomain();
  }
}
