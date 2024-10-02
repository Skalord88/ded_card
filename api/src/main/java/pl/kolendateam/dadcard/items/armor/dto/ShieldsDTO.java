package pl.kolendateam.dadcard.items.armor.dto;

import java.math.BigDecimal;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.armor.entity.ArmorsEnum;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.EnchantmentDTO;
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
  public BigDecimal cost;
  public BigDecimal weight;
  public ArmorsEnum armorType;
  public int maxDex;
  public int penality;
  public int failure;
  public String description;
  public EnchantmentDTO enchantment;
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
    if (item.getEnchantment() == null) {
      this.enchantment = new EnchantmentDTO(0, 0);
    } else {
      this.enchantment =
        MapperEnchantment.toEnchantmentDTO(item.getEnchantment());
    }
    this.material = item.getMaterial();
  }
}
