package pl.kolendateam.dadcard.items.weapons.dto;

import java.io.Serializable;
import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNameEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@NoArgsConstructor
public class WeaponsDTO implements Serializable {

  public int id;
  public String name;
  public WeaponNameEnum weaponName;
  public ItemTypeEnum itemType;
  public BigDecimal cost;
  public WeaponNumericEnum damage;
  public WeaponNumericEnum critical;
  public Integer range;
  public BigDecimal weight;
  public WeaponCategoriesEnum[] type;
  public SpecialAttacksDTO specialAttacks;
  public String description;
  public EnchantmentDTO enchantment;
  public MaterialEnum material;

  public WeaponsDTO(int idZero) {
    this.id = idZero;
  }

  public WeaponsDTO(Weapons item) {
    this.id = item.getId();
    this.name = item.getName();
    this.weaponName = item.getWeaponName();
    this.itemType = ItemTypeEnum.WEAPON;
    this.cost = item.getCost();
    this.damage = item.getDamage();
    this.critical = item.getCritical();
    this.range = item.getRange();
    this.weight = item.getWeight();
    if (item.getSpecialAttacks() == null) {
      this.specialAttacks = null;
    } else {
      SpecialAttacksDTO sAttacksDTO = new Gson()
          .fromJson(item.getSpecialAttacks(), SpecialAttacksDTO.class);
      this.specialAttacks = sAttacksDTO;
    }
    Gson gson = new Gson();
    Type listWeaponType = new TypeToken<WeaponCategoriesEnum[]>() {
    }.getType();
    WeaponCategoriesEnum[] typ = gson.fromJson(item.getType(), listWeaponType);
    this.type = typ;
    this.description = item.getDescription();
    if (item.getEnchantment() == null) {
      this.enchantment = null;
    } else {
      this.enchantment = MapperEnchantment.toEnchantmentDTO(item.getEnchantment());
    }
    this.material = item.getMaterial();
  }

}
