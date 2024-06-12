package pl.kolendateam.dadcard.attack.dto;

import java.io.Serializable;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;

@NoArgsConstructor
public class AttacksDTO implements Serializable {

    public int id;
    public WeaponsDTO firstAttackSetOne;
    public WeaponsDTO secondAttackSetOne;
    public WeaponsDTO additionalAttackSetOne;
    public WeaponsDTO firstAttackSetTwo;
    public WeaponsDTO secondAttackSetTwo;
    public WeaponsDTO additionalAttackSetTwo;

    public AttacksDTO(Attacks characterAttacks) {

        this.id = characterAttacks.getId();

        if (characterAttacks.getFirstAttackSetOne() != null) {
            this.firstAttackSetOne = MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetOne());
        } else {
            this.firstAttackSetOne = new WeaponsDTO(1);
        }
        if (characterAttacks.getSecondAttackSetOne() != null) {
            this.secondAttackSetOne = MapperItemsDTO.toWeaponDTO(characterAttacks.getSecondAttackSetOne());
        } else {
            this.secondAttackSetOne = new WeaponsDTO(1);
        }
        if (characterAttacks.getAdditionalAttackSetOne() != null) {
            this.additionalAttackSetOne = MapperItemsDTO.toWeaponDTO(characterAttacks.getAdditionalAttackSetOne());
        } else {
            this.additionalAttackSetOne = new WeaponsDTO(1);
        }
        if (characterAttacks.getFirstAttackSetTwo() != null) {
            this.firstAttackSetTwo = MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetTwo());
        } else {
            this.firstAttackSetTwo = new WeaponsDTO(1);
        }
        if (characterAttacks.getAdditionalAttackSetTwo() != null) {
            this.secondAttackSetTwo = MapperItemsDTO.toWeaponDTO(characterAttacks.getAdditionalAttackSetTwo());
        } else {
            this.secondAttackSetTwo = new WeaponsDTO(1);
        }
        if (characterAttacks.getAdditionalAttackSetTwo() != null) {
            this.additionalAttackSetTwo = MapperItemsDTO.toWeaponDTO(characterAttacks.getAdditionalAttackSetTwo());
        } else {
            this.additionalAttackSetTwo = new WeaponsDTO(1);
        }
    }

}
