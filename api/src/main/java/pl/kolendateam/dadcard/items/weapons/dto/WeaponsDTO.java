package pl.kolendateam.dadcard.items.weapons.dto;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.attack.dto.SpecialAttacksDTO;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponCategoriesEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNameEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;
import pl.kolendateam.dadcard.size.entity.SizeEnum;

@AllArgsConstructor
@NoArgsConstructor
public class WeaponsDTO implements Serializable {

  public int id;
  public String name;
  public WeaponNameEnum weaponName;
  public ItemTypeEnum itemType;
  public double cost;
  public WeaponNumericEnum damage;
  public WeaponNumericEnum critical;
  public Integer range;
  public BigDecimal weight;
  public SizeEnum size;
  public Set<ModifierDTO> modifiers;
  public WeaponCategoriesEnum[] type;
  public SpecialAttacksDTO specialAttacks;
  public String description;
  public MaterialEnum material;
  public Set<EnchantmentDTO> enchantmentList;

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
    this.size = item.getSize();
    this.modifiers = MapperModifierBonus.toListModifierDTO(item.getModifiers());
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
    this.enchantmentList = new HashSet<>();
  }

  public WeaponsDTO(EnchantedItems item) {
    WeaponsDTO weaponDTO = new WeaponsDTO((Weapons) item.getItem());
    Set<ModifierDTO> setOfMods = new HashSet<>();
    if (weaponDTO.modifiers != null) {
      weaponDTO.modifiers.forEach(it -> {
        setOfMods.add(it);
      });
    }
    if (item.getModifiers() != null) {
      item
        .getModifiers()
        .forEach(it -> {
          setOfMods.add(MapperModifierBonus.toModifierDTO(it));
        });
    }
    this.id = item.getItem().getId();
    this.name = item.getItem().getName();
    this.itemType = ItemTypeEnum.WEAPON;
    this.weaponName = weaponDTO.weaponName;
    this.modifiers = setOfMods;
    this.cost = weaponDTO.cost;
    this.weight = weaponDTO.weight;
    this.size = weaponDTO.size;
    this.modifiers = setOfMods;
    this.type = weaponDTO.type;
    this.specialAttacks = weaponDTO.specialAttacks;
    this.description = weaponDTO.description;
    this.material = item.getMaterial();
    this.enchantmentList =
      MapperEnchantment.toEnchantmentDTOSet(item.getEnchantmentList());
  }
}
