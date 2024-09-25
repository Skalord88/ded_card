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
    this.firstAttackSetOne =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetOne());
    this.secondAttackSetOne =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getSecondAttackSetOne());
    this.additionalAttackSetOne =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getAdditionalAttackSetOne());
    this.firstAttackSetTwo =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetTwo());
    this.secondAttackSetTwo =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getSecondAttackSetTwo());
    this.additionalAttackSetTwo =
      MapperItemsDTO.toWeaponDTO(characterAttacks.getAdditionalAttackSetTwo());
  }
}
