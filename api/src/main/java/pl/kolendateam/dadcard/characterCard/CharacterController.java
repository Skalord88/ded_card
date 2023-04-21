package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.CreateCharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPgDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPg;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;

@RestController
@RequestMapping("character-card")
public class CharacterController {
    
    ClassRepository classRepository;
    CharacterRepository characterRepository;

    @Autowired
    public CharacterController(CharacterRepository characterRepository,ClassRepository classRepository){
        this.characterRepository = characterRepository;
        this.classRepository = classRepository;
    }

    @GetMapping(value = "{id}")
    @ResponseBody
    public Character getCharacter(@PathVariable int id){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();
        return character;
    }

    @PostMapping(value="",consumes = {"application/json"})
    public CharacterDTO create(@RequestBody CharacterDTO characterDTO){
        
        Character character = new Character(characterDTO.characterName,characterDTO.playerName);

        this.characterRepository.save(character);

        return characterDTO;
    }

    @PostMapping(value="{id}/ability",consumes = {"application/json"})
    public CharacterDTO setCharacterAbility(@PathVariable int id, @RequestBody AbilityDTO abilityDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }
        
        Character character = characterOpt.get();  

        Abilitys abilitys = new Abilitys();

        abilitys.setStreght(abilityDTO.streght);
        abilitys.setDextrity(abilityDTO.dextrity);
        abilitys.setConstitution(abilityDTO.constitution);
        abilitys.setIntelligence(abilityDTO.intelligence);
        abilitys.setWisdom(abilityDTO.wisdom);
        abilitys.setCharisma(abilityDTO.charisma);
        
        character.setAbilitys(abilitys);

        this.characterRepository.save(character);

        return new CharacterDTO(character);
    }

    @PostMapping(value="{id}/class",consumes = {"application/json"})
    public CharacterDTO setCharacterClass(@PathVariable int id, @RequestBody ClassPgDTO classPgDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Optional <ClassCharacter> classOpt = this.classRepository.findById(classPgDTO.id);

        if(!classOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Class Not Found");
        }
        
        Character character = characterOpt.get();

        ClassCharacter classCharacter = classOpt.get();

        ArrayList<ClassPg> classPgList = character.getClassPgArray();

        ClassPg clPg = new ClassPg(classCharacter.getId(),classCharacter.getName(),1); 
        int indexClassInDB = clPg.findIndexInArrayById(classPgList);

        if(indexClassInDB == -1){
            character.addClassToPgArray(clPg);
        }else{
            character.incrementLevelClassForIndex(indexClassInDB);
        }     
        
        this.characterRepository.save(character);
        return new CharacterDTO (character);
    }
}
