package pl.kolendateam.dadcard.characterCard;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.characterCard.dto.CharacterSkillDTO;
import pl.kolendateam.dadcard.characterCard.entity.CharacterClass;
import pl.kolendateam.dadcard.characterCard.entity.CharacterSkill;
import pl.kolendateam.dadcard.characterCard.repository.CharacterClassRepository;
import pl.kolendateam.dadcard.characterCard.repository.CharacterSkillRepository;

@RestController
@RequestMapping("character")
public class CharacterSkillController {
    

    CharacterSkillRepository characterRaceRepository;
    CharacterClassRepository characterClassRepository;

    @Autowired
    public CharacterSkillController(CharacterSkillRepository characterRaceRepository, CharacterClassRepository characterClassRepository){
        this.characterRaceRepository = characterRaceRepository;
        this.characterClassRepository = characterClassRepository;
    }

    @PostMapping(value="chooseskill",consumes = {"application/json"})
    public CharacterSkill createCharacterSkill(@RequestBody CharacterSkillDTO characterSkillDTO){

        List <CharacterClass> listClass = characterClassRepository.findAll();

        Map.Entry <Integer, String> classes = new HashMap<>();

            for(CharacterClass l : listClass){

                for(String v : classes.values()){
                
                    if(v.equals(l.getClassName())){

                        classes.put(++,x.getClassName());

                    } else {

                        classes.put(1,x.getClassName());

                    }
                }
            }
        

        CharacterSkill skill = new CharacterSkill (characterSkillDTO.skillName,characterSkillDTO.skillValue);

        this.characterRaceRepository.save(skill);

        return skill;
    }

}
