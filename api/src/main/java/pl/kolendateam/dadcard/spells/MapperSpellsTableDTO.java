package pl.kolendateam.dadcard.spells;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
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

}
