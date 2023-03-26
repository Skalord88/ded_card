package pl.kolendateam.dadcard.characterCard;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.MapperListClassPgToDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.MaperListClassToDTO;
import pl.kolendateam.dadcard.classCharacter.dto.ClassCharacterDTO;
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

    @PostMapping(value="",consumes = {"application/json"})
    public CharacterDTO create(@RequestBody CharacterDTO characterDTO){
        Character character = new Character(characterDTO.characterName,characterDTO.playerName);

        this.characterRepository.save(character);

        return characterDTO;
    }

    @PostMapping(value="{id}/class",consumes = {"application/json"})
    public CharacterDTO setCharacterClass(@PathVariable int id, @RequestBody ClassPgDTO classPgDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();
        
        Optional <ClassCharacter> classOpt = this.classRepository.findByName(classPgDTO.className);
        // Optional <ClassCharacter> classOpt = this.classRepository.findById(classPgDTO.id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Class Not Found");
        } 

        ClassCharacter classCharacter = classOpt.get();
        ArrayList <ClassPg> classPgList = new ArrayList<ClassPg>();

        ClassPg classPg = new ClassPg();     

        classPg.setName(classCharacter.getName());
        classPg.setId(classCharacter.getId());

        for (ClassPg x : classPgList){
            classPgList.add(x);
        }
        
        character.setClassPg(classPgList);

        this.characterRepository.save(character);

        return new CharacterDTO (character);

    }

}
