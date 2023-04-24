package pl.kolendateam.dadcard.characterCard;

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

import pl.kolendateam.dadcard.characterCard.dto.AbilityDTO;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.classCharacter.dto.ClassPcDTO;
import pl.kolendateam.dadcard.classCharacter.entity.ClassCharacter;
import pl.kolendateam.dadcard.classCharacter.entity.ClassPc;
import pl.kolendateam.dadcard.classCharacter.entity.SavingThrow;
import pl.kolendateam.dadcard.classCharacter.repository.ClassRepository;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;

@RestController
@RequestMapping("character-card")
public class CharacterController {
    
    ClassRepository classRepository;
    CharacterRepository characterRepository;
    SkillsRepository skillsRepository;

    @Autowired
    public CharacterController(CharacterRepository characterRepository,ClassRepository classRepository, SkillsRepository skillsRepository){
        this.characterRepository = characterRepository;
        this.classRepository = classRepository;
        this.skillsRepository = skillsRepository;
    }

    @PostMapping(value="",consumes = {"application/json"})
    public CharacterDTO createCharacter(@RequestBody CharacterDTO characterDTO){
        
        Character character = new Character(characterDTO.characterName,characterDTO.playerName);

        SavingThrow savingThrow = new SavingThrow(0, 0, 0);
        
        character.setSavingThrow(savingThrow);

        this.characterRepository.save(character);

        return characterDTO;
    }

    @GetMapping(value = "{id}")
    public CharacterDTO showCharacter(@PathVariable int id){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();
        return new CharacterDTO(character);
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
    public CharacterDTO setCharacterClass(@PathVariable int id, @RequestBody ClassPcDTO classPcDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        Optional <ClassCharacter> classOpt = this.classRepository.findById(classPcDTO.id);

        if(!classOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Class Not Found");
            }
        
        List <Skills> skillsList = this.skillsRepository.findAll();

        ClassCharacter classCharacter = classOpt.get();

        ArrayList<ClassPc> classPcList = character.getClassPcArray();

        character.calculateSkillPointsFirstLevel(classCharacter.getSkillPoints());

        character.createSkillsArray(skillsList);
        if(character.getClassSkills().isEmpty()){
            character.createSkillsArray(skillsList);
        }

        ClassPc classPc = new ClassPc(classCharacter.getId(),classCharacter.getName(),1,classCharacter.getSavingThrow());
         
        int indexClassInDB = classPc.findIndexInArrayById(classPcList);

        if(indexClassInDB == -1){
            character.addClassToPcArray(classPc);
            character.setSkillsTruePcArray(classCharacter.getAvailableSkills());           
        }else{
            character.incrementLevelClassForIndex(indexClassInDB);
        }

        int levelClassInDB = classPc.findLevelInArrayById(classPcList,classCharacter.getId());

        if(levelClassInDB == 1){
            character.addSavingThrowLevelOne(classPc);
        }else{
            character.incementSavingThrow();
        }
    
        character.incrementLep();
        
        character.calculateSkillPoints(classCharacter.getSkillPoints());
        
        this.characterRepository.save(character);
        return new CharacterDTO (character);
    }
}
