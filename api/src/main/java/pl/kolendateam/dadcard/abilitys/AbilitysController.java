package pl.kolendateam.dadcard.abilitys;

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

import pl.kolendateam.dadcard.abilitys.dto.AbilitysDTO;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.skills.entity.Skills;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;

@RestController
@RequestMapping("")
public class AbilitysController {

    CharacterRepository characterRepository;
    SkillsRepository skillsRepository;

    @Autowired
    AbilitysController(CharacterRepository characterRepository,SkillsRepository skillsRepository){
        this.characterRepository = characterRepository;
        this.skillsRepository = skillsRepository;
    }

    @PostMapping(value="{id}/ability",consumes = {"application/json"})
    public CharacterDTO setCharacterAbility(@PathVariable int id, @RequestBody AbilitysDTO abilitysDTO){

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if(!characterOpt.isPresent()){
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Character Not Found");
        }
        
        Character character = characterOpt.get();  

        Abilitys abilitys = new Abilitys();

        abilitys.setStreght(abilitysDTO.streght);
        abilitys.setDextrity(abilitysDTO.dextrity);
        abilitys.setConstitution(abilitysDTO.constitution);
        abilitys.setIntelligence(abilitysDTO.intelligence);
        abilitys.setWisdom(abilitysDTO.wisdom);
        abilitys.setCharisma(abilitysDTO.charisma);

        character.setAbilitys(abilitys);

        List <Skills> skillsList = this.skillsRepository.findAll();

        if(character.getClassSkills().isEmpty()){
            character.createSkillsArray(skillsList);
        }
        character.createArmorClass();

        this.characterRepository.save(character);

        return new CharacterDTO(character);
    }
    
}
