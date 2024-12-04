package pl.kolendateam.dadcard.attack.dto;

import java.io.Serializable;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.entity.Attacks;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

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
      characterAttacks.getFirstAttackSetOne() != null
        ? MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetOne())
        : null;

    this.secondAttackSetOne =
      characterAttacks.getSecondAttackSetOne() != null
        ? MapperItemsDTO.toWeaponDTO(characterAttacks.getSecondAttackSetOne())
        : null;

    this.additionalAttackSetOne =
      characterAttacks.getAdditionalAttackSetOne() != null
        ? MapperItemsDTO.toWeaponDTO(
          characterAttacks.getAdditionalAttackSetOne()
        )
        : null;

    this.firstAttackSetTwo =
      characterAttacks.getFirstAttackSetTwo() != null
        ? MapperItemsDTO.toWeaponDTO(characterAttacks.getFirstAttackSetTwo())
        : null;

    this.secondAttackSetTwo =
      characterAttacks.getSecondAttackSetTwo() != null
        ? MapperItemsDTO.toWeaponDTO(characterAttacks.getSecondAttackSetTwo())
        : null;

    this.additionalAttackSetTwo =
      characterAttacks.getAdditionalAttackSetTwo() != null
        ? MapperItemsDTO.toWeaponDTO(
          characterAttacks.getAdditionalAttackSetTwo()
        )
        : null;
  }
}
