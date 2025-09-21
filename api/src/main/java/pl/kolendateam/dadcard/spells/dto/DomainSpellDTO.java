package pl.kolendateam.dadcard.spells.dto;

import pl.kolendateam.dadcard.spells.entity.DomainSpell;
import pl.kolendateam.dadcard.spells.entity.Spells;

public class DomainSpellDTO {

  public SpellsDTO spell;
  public int level;

  public DomainSpellDTO(Spells s, int l) {
    this.spell = s != null ? new SpellsDTO(s) : null;
    this.level = l;
  }

  public DomainSpellDTO(DomainSpell ds) {
    this.spell = ds.getSpell() != null ? new SpellsDTO(ds.getSpell()) : null;
    this.level = ds.getLevel();
  }
}
