package pl.kolendateam.dadcard.characterCard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.characterCard.dto.AttackVsArmorClassDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;
import pl.kolendateam.dadcard.characterCard.repository.CharacterRepository;

@RestController
@RequestMapping("attack")
public class AttackController {

    CharacterRepository characterRepository;

    @Autowired
    AttackController(CharacterRepository characterRepository){
        this.characterRepository = characterRepository;
    }

    @PostMapping(value="{id}/attackAC",consumes = {"application/json"})
    public AttackVsArmorClassDTO attackVsArmorClass(@PathVariable int id,
     @RequestBody AttackVsArmorClassDTO attackVsArmorClassDTO){

        List<Character> characterOpt = this.characterRepository.findAll();

        Character character1= new Character();
        Character character2= new Character();

        for(Character ch : characterOpt){
            if(ch.id == id){
                character1 = ch;
            }
            
            if(ch.id == attackVsArmorClassDTO.idA){
                character2 = ch;
            }
        }

        int resultat = attackVsArmorClassDTO.d20+character1.streghtAttack();

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
            character2.getArmorClass(),character2.getAbilitys());

            boolean isHit = false;

        if(resultat >= armorClassTotal2.ACTotal(armorClassTotal2)){
            isHit = true;
        }

        return new AttackVsArmorClassDTO (character1,character2,isHit);
     }
    
}
