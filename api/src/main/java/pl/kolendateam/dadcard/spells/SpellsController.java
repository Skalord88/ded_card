package pl.kolendateam.dadcard.spells;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@RestController
@RequestMapping("spells")
public class SpellsController {
    
    SpellsRepository spellsRepository;
    SpellsTableRepository spellsTableRepository;
    //CharacterRepository characterRepository;

    @Autowired
    public SpellsController(
        SpellsRepository spellsRepository
        ,SpellsTableRepository spellsTableRepository
        //,CharacterRepository characterRepository
        ){
        this.spellsRepository = spellsRepository;
        this.spellsTableRepository = spellsTableRepository;
        //this.characterRepository = characterRepository;
    }

    @GetMapping("")
    public List<SpellsDTO> showSpellsList(){

    List<Spells> spellsList = this.spellsRepository.findAll();

    return MapperSpellsDTO.toSpellsDTO(spellsList);

    }

    @GetMapping("/spellstable")
    public List<SpellsTableDTO> showSpellsTableList(){

    List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();

    return MapperSpellsTableDTO.toSpellsTableDTO(spellsTableList);

    }

}