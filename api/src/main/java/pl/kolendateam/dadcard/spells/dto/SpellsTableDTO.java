package pl.kolendateam.dadcard.spells.dto;

import java.util.List;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

public class SpellsTableDTO {

  public int id;
  public SpellsEnum magicClass;
  public SpellsEnum spellsDayKnown;
  public List<SpellsInLevel> spellsInLevel;

  public SpellsTableDTO(SpellsTable spellTable) {
    this.id = spellTable.getId();
    this.magicClass = spellTable.getMagicClass();
    this.spellsDayKnown = spellTable.getSpellsDayKnown();
    this.spellsInLevel = spellTable.getSpellsInLevel();
    //   MapperSpellsInLevel.toSpellsInLevel(spellTable.getSpellsInLevel());
  }
}
