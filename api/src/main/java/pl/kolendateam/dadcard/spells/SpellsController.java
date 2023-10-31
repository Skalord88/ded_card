package pl.kolendateam.dadcard.spells;

import java.util.ArrayList;
import java.util.HashMap;
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
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.EnumClass;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.spells.dto.SpellsAddDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsClassTableDTO;
import pl.kolendateam.dadcard.spells.dto.SpellsDTO;
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
    ClassRepository classRepository;

    @Autowired
    public SpellsController(
        SpellsRepository spellsRepository
        ,SpellsTableRepository spellsTableRepository
        ,CharacterRepository characterRepository
        ,ClassRepository classRepository
        ){
        this.spellsRepository = spellsRepository;
        this.spellsTableRepository = spellsTableRepository;
        this.characterRepository = characterRepository;
        this.classRepository = classRepository;
    }

    @GetMapping("")
    public List<SpellsDTO> showSpellsList(){

    List<Spells> spellsList = this.spellsRepository.findAll();

    return MapperSpellsDTO.toSpellsDTO(spellsList);

    }

    @GetMapping("{id}/spellstable")
    public List<SpellsClassTableDTO> showSpellsTableList(@PathVariable int id){

    List<SpellsTable> spellsTableList = this.spellsTableRepository.findAll();
    Optional<ClassCharacter> classOpt = this.classRepository.findById(id);

    if (!classOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Class Not Found");
        }
    
    ClassCharacter classFromId = classOpt.get();

    return MapperSpellsTableDTO.toClassSpellsDTO(spellsTableList, classFromId.getSpellsKnown(), classFromId.getSpellsPerDay());

    }

    @GetMapping("{id}")
    public List<SpellsDTO> showSpellsClassList(@PathVariable int id){

    List<Spells> spellsList = this.spellsRepository.findAll();
    Optional<ClassCharacter> classOpt = this.classRepository.findById(id);

    if (!classOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Class Not Found");
        }

    ClassCharacter classFromId = classOpt.get();

    return MapperSpellsDTO.toClassSpellsDTO(spellsList, classFromId.getSpellsDomain());

    }

    @PostMapping(value = "{id}/addspells", consumes = {"application/json"})
    public CharacterDTO addSpellsKnown(@PathVariable int id, @RequestBody SpellsAddDTO SpellsAddDTO){
        
        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        List<Spells> spellsList = this.spellsRepository.findAll();

        SpellsEnum spellClassE = character.characterGetSpellClassById(SpellsAddDTO.idClass);
        EnumClass classNameE = character.characterGetClassEnumById(SpellsAddDTO.idClass);
        int maxLv = character.getMagicKnown().get(classNameE).length;
        Integer lv = 0;

        if(spellClassE != null){
            for(Spells spell : spellsList){
                Integer spellToAdd = spell.selectSpellsForClass(spellClassE, maxLv);
                if(spellToAdd != null){
                    lv = spell.selectSpellByLv(spell);
                }
                
                if(spellToAdd != null){
                    character.addSpells(spellToAdd,classNameE,lv);
                }
            }
        }

        this.characterRepository.save(character);

        return new CharacterDTO (character);
    }

}