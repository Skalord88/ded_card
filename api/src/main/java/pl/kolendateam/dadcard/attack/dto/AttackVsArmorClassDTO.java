package pl.kolendateam.dadcard.attack.dto;

import lombok.NoArgsConstructor;
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

        this.streghtAttack = character1.streghtAttack();
        this.dextrityAttack = character1.dextrityAttack();

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
            character2.getArmorClass(),character2.getAbilitys());
        this.armorClassA = armorClassTotal2.ACTotal(armorClassTotal2);
        this.isHit = hit;

    }
    
}
