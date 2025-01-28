package pl.kolendateam.dadcard.items.weapons.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
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

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

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
    // if (weapon.specialAttacks != null) {
    //   this.specialAttacks =
    //     MapperSpecialAttacks.toSpecialAttacks(weapon.specialAttacks);
    // } else {
    //   this.specialAttacks = null;
    // }
    this.material = weapon.material;
    // this.modifiers = MapperModifierBonus.toListModifier(weapon.modifiers);
    // if (weapon.enchantment == null) {
    //   this.enchantment = new Enchantment(0, 0);
    // } else {
    //   this.enchantment = MapperEnchantment.toEnchantment(weapon.enchantment);
    // }
  }

  public void setItemType(ItemTypeEnum itemType) {}

  public Weapons(int idZero) {
    super(idZero);
  }
}
