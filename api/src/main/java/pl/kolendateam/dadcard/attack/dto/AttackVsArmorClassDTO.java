package pl.kolendateam.dadcard.attack.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.abilitys.entity.Abilitys;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@NoArgsConstructor
public class AttackVsArmorClassDTO {

    public int streghtAttack;
    public int dextrityAttack;

    public int armorClassA;
    public boolean isHit;

    public AttackVsArmorClassDTO(
        Character character1, Character character2, boolean hit){

        Abilitys ab1 = character1.getAbilitys();
        this.streghtAttack = (int)character1.getBab()+ab1.bonusStreght(ab1)+character1.getSize().getBonusAttackAc();
        this.dextrityAttack = (int)character1.getBab()+ab1.bonusDextrity(ab1)+character1.getSize().getBonusAttackAc();

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
            character2.getArmorClass(),character2.getAbilitys(),character2.getSize());
        this.armorClassA = armorClassTotal2.ACTotal(armorClassTotal2);
        this.isHit = hit;

    }
    
}
