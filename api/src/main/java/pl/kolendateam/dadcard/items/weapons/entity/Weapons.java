package pl.kolendateam.dadcard.items.weapons.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue(value = "WEAPON")
public class Weapons extends Items {

  @Enumerated(EnumType.STRING)
  WeaponNameEnum weaponName;

  @Enumerated(EnumType.STRING)
  WeaponNumericEnum damage;

  @Enumerated(EnumType.STRING)
  WeaponNumericEnum critical;

  Integer range;
  String type;
  String specialAttacks;

  public Weapons(WeaponsDTO weapon) {
    super(weapon);
    this.weaponName = weapon.weaponName;
    this.damage = weapon.damage;
    this.critical = weapon.critical;
    this.range = weapon.range;
    this.type = weapon.type.toString();
    if (weapon.specialAttacks != null || !weapon.specialAttacks.equals("")) {
      this.specialAttacks = MapperSpecialAttacks.toSpecialAttacks(weapon.specialAttacks);
    } else {
      this.specialAttacks = null;
    }
  }

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Weapons(int idZero) {
    super(idZero);
  }

}
