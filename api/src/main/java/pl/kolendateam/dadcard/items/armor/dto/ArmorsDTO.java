package pl.kolendateam.dadcard.items.armor.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
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
  public Set<EnchantmentDTO> enchantmentList;

  public ArmorsDTO(Armors item) {
    this.id = item.getId();
    this.name = item.getName();
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
    this.enchantmentList = new HashSet<>();
  }

  public ArmorsDTO(EnchantedItems item) {
    ArmorsDTO armorDTO = new ArmorsDTO((Armors) item.getItem());
    this.id = item.getId();
    this.name = item.getName();
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
    this.cost = armorDTO.cost;
    this.weight = armorDTO.weight;
    this.armorType = armorDTO.armorType;
    this.maxDex = armorDTO.maxDex;
    this.penality = armorDTO.penality;
    this.failure = armorDTO.failure;
    this.description = armorDTO.description;
    this.material = item.getMaterial();
    this.enchantmentList =
      MapperEnchantment.toEnchantmentDTOSet(item.getEnchantmentList());
  }
}
