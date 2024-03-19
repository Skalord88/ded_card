package pl.kolendateam.dadcard.items.weapons.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;

@Entity
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
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

  public Weapons(WeaponsDTO weaponOne) {
    super(
        (short) weaponOne.id,
        weaponOne.name,
        weaponOne.cost,
        weaponOne.weight,
        weaponOne.description);
    this.weaponName = weaponOne.weaponName;
    this.damage = weaponOne.damage;
    this.critical = weaponOne.critical;
    this.range = weaponOne.range;
    this.type = weaponOne.type.toString();
    this.specialAttacks = weaponOne.specialAttacks.toString();
  }

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Weapons(int idZero) {
    super(idZero);
  }

}
