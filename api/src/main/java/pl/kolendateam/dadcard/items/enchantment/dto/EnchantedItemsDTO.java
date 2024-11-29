package pl.kolendateam.dadcard.items.enchantment.dto;

import java.util.Set;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@NoArgsConstructor
public class EnchantedItemsDTO {

  public int id;
  public Object item;
  public String name;
  public Set<EnchantmentDTO> enchantmentList;
  public MaterialEnum material;
  public Set<ModifierDTO> modifiers;
  public double cost;
  public String description;

  public EnchantedItemsDTO(EnchantedItems enchantedItems) {
    this.id = enchantedItems.getId();
    this.name = enchantedItems.getName();

    if (enchantedItems.getItem() != null) {
      if (enchantedItems.getItem() instanceof Armors) {
        this.item =
          MapperItemsDTO.toItemsDTO((Armors) enchantedItems.getItem());
      } else if (enchantedItems.getItem() instanceof Shields) {
        this.item =
          MapperItemsDTO.toItemsDTO((Shields) enchantedItems.getItem());
      } else if (enchantedItems.getItem() instanceof Weapons) {
        this.item =
          MapperItemsDTO.toItemsDTO((Weapons) enchantedItems.getItem());
      }
    } else {
      this.item = null;
    }

    this.enchantmentList =
      MapperEnchantment.toEnchantmentDTOSet(
        enchantedItems.getEnchantmentList()
      );

    this.material = enchantedItems.getMaterial();
    this.modifiers =
      MapperModifierBonus.toSetModifierDTO(enchantedItems.getModifiers());
    this.description = enchantedItems.getDescription();
  }
}
