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
import pl.kolendateam.dadcard.abilitys.entity.AbilityBonus;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.abilitys.repository.AbilityBonusRepository;
import pl.kolendateam.dadcard.characterCard.dto.CharacterDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("")
public class AbilitysController {

    CharacterRepository characterRepository;
    AbilityBonusRepository abilityBonusRepository;

    @Autowired
    AbilitysController(CharacterRepository characterRepository, AbilityBonusRepository abilityBonusRepository){
        this.characterRepository = characterRepository;
        this.abilityBonusRepository = abilityBonusRepository;
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

        List <AbilityBonus> valueAbility = this.abilityBonusRepository.findAll();

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.streght){
                abilitys.setStreghtBonus(value.getBonus());
            }
        }

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.dextrity){
                abilitys.setDextrityBonus(value.getBonus());
            }
        }

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.constitution){
                abilitys.setConstitutionBonus(value.getBonus());
            }
        }

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.intelligence){
                abilitys.setIntelligenceBonus(value.getBonus());
            }
        }

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.wisdom){
                abilitys.setWisdomBonus(value.getBonus());
            }
        }

        for(AbilityBonus value : valueAbility){
            if(value.getValue()==abilitysDTO.charisma){
                abilitys.setCharismaBonus(value.getBonus());
            }
        }
        
        character.setAbilitys(abilitys);

        this.characterRepository.save(character);

        return new CharacterDTO(character);
    }
    
}
