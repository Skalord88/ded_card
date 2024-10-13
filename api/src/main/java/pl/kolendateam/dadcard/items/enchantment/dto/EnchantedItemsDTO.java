package pl.kolendateam.dadcard.items.enchantment.dto;

import java.math.BigDecimal;
import java.util.Set;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

public class EnchantedItemsDTO {

  public int id;
  public ItemsDTO item;
  public Set<EnchantmentDTO> enchantmentList;
  public MaterialEnum material;
  public Set<ModifierDTO> modifiers;
  public double cost;
  public String description;

  public EnchantedItemsDTO(EnchantedItems enchantedItems) {
    this.id = enchantedItems.getId();
    if (enchantedItems.getItem() instanceof Armors) {
      this.item = MapperItemsDTO.toItemsDTO((Armors) enchantedItems.getItem());
    } else if (enchantedItems.getItem() instanceof Shields) {
      this.item = MapperItemsDTO.toItemsDTO((Shields) enchantedItems.getItem());
    } else if (enchantedItems.getItem() instanceof Weapons) {
      this.item = MapperItemsDTO.toItemsDTO((Weapons) enchantedItems.getItem());
    }
    this.enchantmentList =
      MapperEnchantment.toEnchantmentDTOSet(
        enchantedItems.getEnchantmentList()
      );
    this.material = enchantedItems.getMaterial();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(enchantedItems.getModifiers());
    this.cost = enchantedItems.getCost();
    this.description = enchantedItems.getDescription();
  }
}
