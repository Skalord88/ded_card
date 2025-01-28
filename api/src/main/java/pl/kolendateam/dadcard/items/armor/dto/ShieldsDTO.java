package pl.kolendateam.dadcard.items.armor.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@AllArgsConstructor
@NoArgsConstructor
public class ShieldsDTO {

  public int id;
  public String name;
  public int itemId;
  public ItemTypeEnum itemType;
  public ArmorsEnum shieldName;
  public PrerequisiteDTO modifiers;
  public double cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public Integer enchantmentBonus;
  public List<EnchantmentDTO> enchantment;
  public MaterialEnum material;

  public ShieldsDTO(Shields item) {
    this.id = item.getId();
    this.name = item.getName();
    this.itemType = ItemTypeEnum.SHIELD;
    this.shieldName = item.getShieldName();
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
  }

  public ShieldsDTO(EnchantedItems item) {
    ShieldsDTO shieldDTO = new ShieldsDTO((Shields) item.getItem());

    this.id = item.getId();
    this.name = item.getName();
    this.itemId = item.getItem().getId();
    this.itemType = ItemTypeEnum.ARMOR;
    this.shieldName = shieldDTO.shieldName;
    if (shieldDTO.modifiers != null) {
      this.modifiers = shieldDTO.modifiers;
    } else if (item.getModifiers() != null) {
      this.modifiers =
        MapperPrerequisiteBonus.toPrerequisiteDTO(item.getModifiers());
    } else {
      this.modifiers = null;
    }
    this.cost = shieldDTO.cost;
    this.weight = shieldDTO.weight;
    this.armorType = shieldDTO.armorType;
    this.maxDex = shieldDTO.maxDex;
    this.penality = shieldDTO.penality;
    this.failure = shieldDTO.failure;
    this.description = shieldDTO.description;
    this.material = item.getMaterial();
    this.enchantmentBonus =
      item.getEnchantmentBonus() != null ? item.getEnchantmentBonus() : 0;
    this.enchantment =
      item.getEnchantment() != null
        ? MapperEnchantment.toEnchantmentDTOList(item.getEnchantment())
        : null;
  }
}
