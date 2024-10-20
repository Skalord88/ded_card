package pl.kolendateam.dadcard.items.armor.dto;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@AllArgsConstructor
@NoArgsConstructor
public class ShieldsDTO {

  public int id;
  public String name;
  public ItemTypeEnum itemType;
  public ArmorsEnum shieldName;
  public Set<ModifierDTO> modifiers;
  public double cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public Set<EnchantmentDTO> enchantmentList = new HashSet<>();
  public MaterialEnum material;

  public ShieldsDTO(Shields item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.SHIELD;
    this.shieldName = item.getShieldName();
    this.modifiers = MapperModifierBonus.toListModifierDTO(item.getModifiers());
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.armorType = item.getArmorType();
    this.maxDex = item.getMaxDex();
    this.penality = item.getPenality();
    this.failure = item.getFailure();
    this.description = item.getDescription();
    this.material = item.getMaterial();
    this.enchantmentList = new HashSet<>();
  }

  public ShieldsDTO(EnchantedItems item) {
    ShieldsDTO shieldDTO = new ShieldsDTO((Shields) item.getItem());
    Set<ModifierDTO> setOfMods = new HashSet<>();
    if (shieldDTO.modifiers != null) {
      shieldDTO.modifiers.forEach(ar -> {
        setOfMods.add(ar);
      });
    }
    if (item.getModifiers() != null) {
      item
        .getModifiers()
        .forEach(ar -> {
          setOfMods.add(MapperModifierBonus.toModifierDTO(ar));
        });
    }
    this.id = item.getItem().getId();
    this.name = item.getItem().getName();
    this.itemType = ItemTypeEnum.ARMOR;
    this.shieldName = shieldDTO.shieldName;
    this.modifiers = setOfMods;
    this.cost = shieldDTO.cost;
    this.weight = shieldDTO.weight;
    this.armorType = shieldDTO.armorType;
    this.maxDex = shieldDTO.maxDex;
    this.penality = shieldDTO.penality;
    this.failure = shieldDTO.failure;
    this.description = shieldDTO.description;
    this.material = item.getMaterial();
    this.enchantmentList =
      MapperEnchantment.toEnchantmentDTOSet(item.getEnchantmentList());
  }
}
