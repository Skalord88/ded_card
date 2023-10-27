package pl.kolendateam.dadcard.spells;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.spells.dto.SpellsAddDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsTableDTO;
import pl.kolendateam.dadcard.spells.entity.Spells;
import pl.kolendateam.dadcard.spells.entity.SpellsEnum;
import pl.kolendateam.dadcard.spells.entity.SpellsTable;
import pl.kolendateam.dadcard.spells.repository.SpellsRepository;
import pl.kolendateam.dadcard.spells.repository.SpellsTableRepository;

@RestController
@RequestMapping("spells")
public class SpellsController {
    
    SpellsRepository spellsRepository;
    SpellsTableRepository spellsTableRepository;
    CharacterRepository characterRepository;

    @Autowired
    public SpellsController(
        SpellsRepository spellsRepository
        ,SpellsTableRepository spellsTableRepository
        ,CharacterRepository characterRepository
        ){
        this.spellsRepository = spellsRepository;
        this.spellsTableRepository = spellsTableRepository;
        this.characterRepository = characterRepository;
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

    @PostMapping(value = "{id}/addspells", consumes = {"application/json"})
    public CharacterDTO addSpellsKnown(@PathVariable int id, @RequestBody SpellsAddDTO SpellsAddDTO){
        
        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        List<Spells> spellsList = this.spellsRepository.findAll();

        Character character = characterOpt.get();
        ArrayList<Integer> classesSpells = new ArrayList<>();

        SpellsEnum spellClassE = character.characterGetClassNameById(SpellsAddDTO.idClass);

        if(spellClassE != null){
            for(Spells spell : spellsList){
                Integer spellToAdd = spell.selectSpellsForClass(character.getMagicKnown(), spellClassE);

                if(spellToAdd != null){
                    classesSpells.add(spellToAdd);
                }

            }

            for(Integer idInList : classesSpells){
                System.out.println(idInList);
            }
            
        character.addSpells(SpellsAddDTO.spells,classesSpells,SpellsAddDTO.idClass);
    }
        this.characterRepository.save(character);

        return new CharacterDTO (character);
    }

}