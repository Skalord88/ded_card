package pl.kolendateam.dadcard.items.armor.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ArmorsDTO implements Serializable {

  public int id;
  public String name;
  public int itemId;
  public ItemTypeEnum itemType;
  public ArmorsEnum armorName;
  public PrerequisiteDTO modifiers;
  public double cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public MaterialEnum material;
  public Integer enchantmentBonus;
  public List<EnchantmentDTO> enchantment;

  public ArmorsDTO(Armors item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemId = item.getId();
    this.itemType = ItemTypeEnum.ARMOR;
    this.armorName = item.getArmorName();
    this.modifiers =
      item.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(item.getModifiers())
        : null;
    this.cost = item.getCost();
    this.weight = item.getWeight();
    this.armorType = item.getArmorType();
    this.maxDex = item.getMaxDex();
    this.penality = item.getPenality();
    this.failure = item.getFailure();
    this.description = item.getDescription();
    this.material = item.getMaterial();
    this.enchantment = null;
  }

  public ArmorsDTO(EnchantedItems item) {
    ArmorsDTO armorDTO = new ArmorsDTO((Armors) item.getItem());

    this.id = item.getId();
    this.name = item.getName();
    this.itemId = item.getItem().getId();
    this.itemType = ItemTypeEnum.ARMOR;
    this.armorName = armorDTO.armorName;
    if (armorDTO.modifiers != null) {
      this.modifiers = armorDTO.modifiers;
    } else if (item.getModifiers() != null) {
      this.modifiers =
        MapperPrerequisiteBonus.toPrerequisiteDTO(item.getModifiers());
    } else {
      this.modifiers = null;
    }
    this.cost = item.getCost() != null ? item.getCost() : armorDTO.cost;
    this.weight = armorDTO.weight;
    this.armorType = armorDTO.armorType;
    this.maxDex = armorDTO.maxDex;
    this.penality = armorDTO.penality;
    this.failure = armorDTO.failure;
    this.description =
      item != null ? item.getDescription() : armorDTO.description;
    this.material =
      (item.getMaterial() == null) ? armorDTO.material : item.getMaterial();
    this.enchantmentBonus =
      item.getEnchantmentBonus() != null ? item.getEnchantmentBonus() : 0;
    this.enchantment =
      item.getEnchantment() != null
        ? MapperEnchantment.toEnchantmentDTOList(item.getEnchantment())
        : null;
  }
}
