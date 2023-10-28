package pl.kolendateam.dadcard.spells.dto;

import java.util.ArrayList;

import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

public class SpellsClassTableDTO {

    public SpellsEnum spellsDayKnown;
    public ArrayList <SpellsInLevel> spellsInLevel;

    public SpellsClassTableDTO(SpellsTable spellTable){

        this.spellsDayKnown = spellTable.getSpellsDayKnown();
        this.spellsInLevel = MapperSpellsInLevel.toSpellsInLevel(spellTable.getSpellsInLevel());

    }

}
