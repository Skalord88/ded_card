package pl.kolendateam.dadcard.characterCard.dto;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.armorClass.MapperArmorClassDTO;
import pl.kolendateam.dadcard.armorClass.dto.ArmorClassDTO;
import pl.kolendateam.dadcard.characterCard.entity.Character;

@NoArgsConstructor
public class AttackVsArmorClassDTO {

    public int id;
    public int streghtAttack;
    public int dextrityAttack;
    public int armorClass;

    public int idA;
    public int armorClassA;

    public int d20;
    boolean isHit;

    public AttackVsArmorClassDTO(
        Character character1, Character character2, boolean hit){

        this.streghtAttack = character1.streghtAttack();
        this.dextrityAttack = character1.dextrityAttack();

        ArmorClassDTO armorClassTotal1 = MapperArmorClassDTO.toArmorClassDTO(
            character1.getArmorClass(),character1.getAbilitys());

        this.armorClass = armorClassTotal1.ACTotal(armorClassTotal1);

        ArmorClassDTO armorClassTotal2 = MapperArmorClassDTO.toArmorClassDTO(
            character2.getArmorClass(),character2.getAbilitys());
        this.armorClassA = 10+armorClassTotal2.ACTotal(armorClassTotal2);
        this.isHit = hit;

    }
    
}
