package pl.kolendateam.dadcard.attack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.attack.dto.AttackDTO;
import pl.kolendateam.dadcard.attack.dto.AttackVsArmorClassDTO;
import pl.kolendateam.dadcard.attack.dto.AttackVsGrappleDTO;
import pl.kolendateam.dadcard.attack.dto.GrappleAttackDTO;
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
     @RequestBody AttackDTO attackDTO){

        List<Character> characterOpt = this.characterRepository.findAll();

        Character character1= new Character();
        Character character2= new Character();

        for(Character ch : characterOpt){
            if(ch.id == id){
                character1 = ch;
            }
            
            if(ch.id == attackDTO.idA){
                character2 = ch;
            }
        }

        Abilitys ab = character1.getAbilitys();
        
        int resultat = 
        attackDTO.d20+(int)character1.getBab()+
        ab.bonusStreght(ab)+
        character1.getSize().getBonusAttackAc();

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
            character2.getArmorClass(),character2.getAbilitys(),character2.getSize());

        boolean isHit = false;

        if(resultat >= armorClassTotal2.ACTotal(armorClassTotal2)){
            isHit = true;
        }

        return new AttackVsArmorClassDTO (character1,character2,isHit);
    }

    @PostMapping(value="{id}/attackGrapple",consumes = {"application/json"})
    public AttackVsGrappleDTO attackVsGrapple(@PathVariable int id,
     @RequestBody GrappleAttackDTO grappleAttackDTO){

        List<Character> characterOpt = this.characterRepository.findAll();

        Character character1= new Character();
        Character character2= new Character();

        for(Character ch : characterOpt){
            if(ch.id == id){
                character1 = ch;
            }
            
            if(ch.id == grappleAttackDTO.idB){
                character2 = ch;
            }
        }

        Abilitys ab = character1.getAbilitys();
        
        int resultat = 
        grappleAttackDTO.d20+(int)character1.getBab()+
        ab.bonusStreght(ab)+
        character1.getSize().getBonusAttackAc();

        ArmorContactDTO armorContactDTO = MapperContactArmorDTO.toContactArmorDTO(
            character2.getArmorClass(),character2.getAbilitys(),character2.getSize());

        boolean isHit = false;

        if(resultat >= armorClassTotal2.ACTotal(armorClassTotal2)){
            isHit = true;
        }

        return new AttackVsArmorClassDTO (character1,character2,isHit);
    }
    
}
