package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.dto.RequestDTO;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.skills.dto.SkillListDTO;
import pl.kolendateam.dadcard.skills.dto.SkillsDTO;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@RestController
@RequestMapping("skills")
public class SkillsController {

    
    SkillsRepository skillsrepository;
    CharacterRepository characterRepository;

    @Autowired
    public SkillsController(SkillsRepository skillsrepository,CharacterRepository characterRepository){
        this.skillsrepository = skillsrepository;
        this.characterRepository = characterRepository;
    }    

    @GetMapping
    public ArrayList<SkillListDTO> getAll(){
        List<Skills> skills = this.skillsrepository.findAll();

        return MapperSkillsToDTO.toSkillsDTOList(skills);
    }

    @PostMapping(value="{id}", consumes = {"application/json"})
    public CharacterDTO buyCharacterSkill(@PathVariable int id, @Valid @RequestBody RequestDTO requestDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        character.buySkills(requestDTO.id, requestDTO.rankToAdd);

        this.characterRepository.save(character);
        
        return new CharacterDTO(character);
    }

}
