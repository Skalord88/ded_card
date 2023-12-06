package pl.kolendateam.dadcard.skills;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;
import pl.kolendateam.dadcard.skills.dto.SkillToAddDTO;
import pl.kolendateam.dadcard.skills.repository.SkillsRepository;

@RestController
@CrossOrigin
@RequestMapping("skills")
public class SkillsController {

    CharacterRepository characterRepository;
    SkillsRepository skillsRepository;

    @Autowired
    public SkillsController(CharacterRepository characterRepository,
    SkillsRepository skillsRepository){
        this.characterRepository = characterRepository;
        this.skillsRepository = skillsRepository;
    }

    @PostMapping(value = "{id}", consumes = { "application/json" })
    public CharacterDTO buyCharacterSkill(@PathVariable short id, @RequestBody ArrayList<SkillToAddDTO> skillsToAdd) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        character.buySkills(skillsToAdd);

        this.characterRepository.save(character);
        return new CharacterDTO(character);
    }

    @PostMapping(value = "remove/{id}", consumes = { "application/json" })
    public CharacterDTO sellCharacterSkill(@PathVariable short id, @RequestBody ArrayList<SkillToAddDTO> skillsToAdd) {

        Optional<Character> characterOpt = this.characterRepository.findById(id);

        if (!characterOpt.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Character Not Found");
        }

        Character character = characterOpt.get();

        character.sellSkills(skillsToAdd);

        this.characterRepository.save(character);
        return new CharacterDTO(character);
    }
    
}
