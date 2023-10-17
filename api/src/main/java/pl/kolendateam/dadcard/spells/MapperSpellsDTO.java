package pl.kolendateam.dadcard.spells;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;

public class MapperSpellsDTO {

    public static ArrayList<SpellsDTO> toSpellsDTO(List<Spells> spellsList) {

        ArrayList<SpellsDTO> spellsDTOList = new ArrayList<>();
        for(Spells spell : spellsList){
            SpellsDTO spellDTO = new SpellsDTO(spell);
            spellsDTOList.add(spellDTO);
        }
        
        return spellsDTOList;
    }

}
