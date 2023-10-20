package pl.kolendateam.dadcard.spells.dto;

import java.util.ArrayList;

import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.spells.MapperSpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

public class SpellsTableDTO {

    public EnumClass magicClass;
    public SpellsEnum spellsDayKnown;
    public ArrayList <SpellsInLevel> spellsInLevel;

    public SpellsTableDTO(SpellsTable spellTable){

        this.magicClass = spellTable.getMagicClass();
        this.spellsDayKnown = spellTable.getSpellsDayKnown();
        this.spellsInLevel = MapperSpellsInLevel.toSpellsInLevel(spellTable.getSpellsInLevel());
    }

}
