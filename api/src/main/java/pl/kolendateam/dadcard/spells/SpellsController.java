package pl.kolendateam.dadcard.spells;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;

@RestController
@RequestMapping("spells")
public class SpellsController {
    
    SpellsRepository spellsRepository;
    //CharacterRepository characterRepository;

    @Autowired
    public SpellsController(
        SpellsRepository spellsRepository
        //,CharacterRepository characterRepository
        ){
        this.spellsRepository = spellsRepository;
        //this.characterRepository = characterRepository;
    }

    @GetMapping("")
    public List<SpellsDTO> showSpellsList(){

    List<Spells> spellsList = this.spellsRepository.findAll();

    return MapperSpellsDTO.toSpellsDTO(spellsList);

    }

}