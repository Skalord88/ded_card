package pl.kolendateam.dadcard.spells;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.spells.dto.SpellsClassTableDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;

public class MapperSpellsTableDTO {

    public static List<SpellsTableDTO> toSpellsTableDTO(List<SpellsTable> spellsTableList) {

        ArrayList<SpellsTableDTO> tableDTO = new ArrayList<>();

        for(SpellsTable spellTable : spellsTableList){
            SpellsTableDTO spellInTableDTO = new SpellsTableDTO(spellTable);
            tableDTO.add(spellInTableDTO);
        }

        return tableDTO;
    }

    public static ArrayList<SpellsClassTableDTO> toClassSpellsDTO(List<SpellsTable> spellsTableList, SpellsEnum spellsKnown,
            SpellsEnum spellsPerDay) {

        ArrayList<SpellsClassTableDTO> knownDayClassDTO = new ArrayList<>();

        for(SpellsTable spellTable : spellsTableList){
            if(spellsKnown == spellTable.getMagicClass()){
                SpellsClassTableDTO spellInTableDTO = new SpellsClassTableDTO(spellTable);
                knownDayClassDTO.add(spellInTableDTO);
                spellsKnown = null;
            }
            if(spellsPerDay == spellTable.getMagicClass()){
                SpellsClassTableDTO spellInTableDTO = new SpellsClassTableDTO(spellTable);
                knownDayClassDTO.add(spellInTableDTO);
                spellsPerDay = null;
            }
        }
        return knownDayClassDTO;
    }

}
