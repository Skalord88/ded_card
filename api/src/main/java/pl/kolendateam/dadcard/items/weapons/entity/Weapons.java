package pl.kolendateam.dadcard.items.weapons.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.ArrayList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.MapperSpecialAttacks;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.entity.Enchantment;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

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

  @Enumerated(EnumType.STRING)
  SizeEnum size;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "enchantment_id", referencedColumnName = "id")
  Enchantment enchantment;

  public Weapons(WeaponsDTO weapon) {
    super(weapon);
    this.weaponName = weapon.weaponName;
    this.damage = weapon.damage;
    this.critical = weapon.critical;
    this.range = weapon.range;
    ArrayList<String> arry = new ArrayList<>();
    for (WeaponCategoriesEnum wC : weapon.type) {
      arry.add("'" + wC.toString() + "'");
    }
    this.type = arry.toString();
    this.size = weapon.size;
    if (weapon.specialAttacks != null) {
      this.specialAttacks =
        MapperSpecialAttacks.toSpecialAttacks(weapon.specialAttacks);
    } else {
      this.specialAttacks = null;
    }
    this.material = weapon.material;
    if (weapon.enchantment == null) {
      this.enchantment = null;
    } else {
      this.enchantment = MapperEnchantment.toEnchantment(weapon.enchantment);
    }
  }

  public void setItemType(ItemTypeEnum itemType) {}

  public Weapons(int idZero) {
    super(idZero);
  }
}
