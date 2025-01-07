package pl.kolendateam.dadcard.items.weapons.dto;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNameEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

@AllArgsConstructor
@NoArgsConstructor
public class WeaponsDTO implements Serializable {

  public int id;
  public int itemId;
  public String name;
  public WeaponNameEnum weaponName;
  public ItemTypeEnum itemType;
  public double cost;
  public WeaponNumericEnum damage;
  public WeaponNumericEnum critical;
  public Integer range;
  public BigDecimal weight;
  public SizeEnum size;
  public PrerequisiteDTO modifiers;
  public WeaponCategoriesEnum[] type;
  public SpecialAttacksDTO specialAttacks;
  public String description;
  public MaterialEnum material;
  public Integer enchantmentBonus;
  public List<EnchantmentDTO> enchantment;

  public WeaponsDTO(Weapons item) {
    this.id = item.getId();
    this.itemId = item.getId();
    this.name = item.getName();
    this.weaponName = item.getWeaponName();
    this.itemType = ItemTypeEnum.WEAPON;
    this.cost = item.getCost();
    this.damage = item.getDamage();
    this.critical = item.getCritical();
    this.range = item.getRange();
    this.weight = item.getWeight();
    this.size = item.getSize();
    this.modifiers =
      item.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(item.getModifiers())
        : null;
    if (item.getSpecialAttacks() == null) {
      this.specialAttacks = null;
    } else {
      SpecialAttacksDTO sAttacksDTO = new Gson()
        .fromJson(item.getSpecialAttacks(), SpecialAttacksDTO.class);
      this.specialAttacks = sAttacksDTO;
    }
    Gson gson = new Gson();
    Type listWeaponType = new TypeToken<WeaponCategoriesEnum[]>() {}.getType();
    WeaponCategoriesEnum[] typ = gson.fromJson(item.getType(), listWeaponType);
    this.type = typ;
    this.description = item.getDescription();
    this.material = item.getMaterial();
    this.enchantment = null;
  }

  public WeaponsDTO(EnchantedItems item) {
    WeaponsDTO weaponDTO = new WeaponsDTO((Weapons) item.getItem());

    this.id = item.getId();
    this.itemId = item.getItem().getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.WEAPON;
    this.weaponName = weaponDTO.weaponName;
    this.modifiers = weaponDTO.modifiers;
    this.cost = weaponDTO.cost;
    this.damage =
      item.getDamage() != null ? item.getDamage() : weaponDTO.damage;
    this.critical = weaponDTO.critical;
    this.range = weaponDTO.range;
    this.description = weaponDTO.description;
    this.weight = weaponDTO.weight;
    this.size = weaponDTO.size;
    if (weaponDTO.modifiers != null) {
      this.modifiers = weaponDTO.modifiers;
    } else if (item.getModifiers() != null) {
      this.modifiers =
        MapperPrerequisiteBonus.toPrerequisiteDTO(item.getModifiers());
    } else {
      this.modifiers = null;
    }
    this.type = weaponDTO.type;
    this.specialAttacks = weaponDTO.specialAttacks;
    this.description = weaponDTO.description;
    this.material = item.getMaterial();
    this.enchantmentBonus =
      item.getEnchantmentBonus() != null ? item.getEnchantmentBonus() : 0;
    this.enchantment =
      item.getEnchantment() != null
        ? MapperEnchantment.toEnchantmentDTOList(item.getEnchantment())
        : null;
  }
}
