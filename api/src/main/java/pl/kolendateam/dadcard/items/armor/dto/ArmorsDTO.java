package pl.kolendateam.dadcard.items.armor.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorsDTO implements Serializable {

  public int id;
  public String name;
  public ItemTypeEnum itemType;
  public ArmorsEnum armorName;
  public Set<ModifierDTO> modifiers;
  public double cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public MaterialEnum material;
  public Set<EnchantmentDTO> enchantmentList;

  public ArmorsDTO(Armors item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.ARMOR;
    this.armorName = item.getArmorName();
    this.modifiers = MapperModifierBonus.toListModifierDTO(item.getModifiers());
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.armorType = item.getArmorType();
    this.maxDex = item.getMaxDex();
    this.penality = item.getPenality();
    this.failure = item.getFailure();
    this.description = item.getDescription();
    this.material = item.getMaterial();
  }

  public ArmorsDTO(EnchantedItems armor) {
    ArmorsDTO armorDTO = new ArmorsDTO((Armors) armor.getItem());
    Set<ModifierDTO> setOfMods = new HashSet<>();
    if (armorDTO.modifiers != null) {
      armorDTO.modifiers.forEach(ar -> {
        setOfMods.add(ar);
      });
    }
    if (armor.getModifiers() != null) {
      armor
        .getModifiers()
        .forEach(ar -> {
          setOfMods.add(MapperModifierBonus.toModifierDTO(ar));
        });
    }
    this.id = armor.getItem().getId();
    this.name = armor.getItem().getName();
    this.itemType = ItemTypeEnum.ARMOR;
    this.armorName = armorDTO.armorName;
    this.modifiers = setOfMods;
    this.cost = armorDTO.cost;
    this.weight = armorDTO.weight;
    this.armorType = armorDTO.armorType;
    this.maxDex = armorDTO.maxDex;
    this.penality = armorDTO.penality;
    this.failure = armorDTO.failure;
    this.description = armorDTO.description;
    this.material = armor.getMaterial();
  }
}
