package pl.kolendateam.dadcard.items.enchantment.dto;

import java.util.List;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@ToString
@NoArgsConstructor
public class EnchantedItemsDTO {

  public Integer id;
  public int itemId;
  public String name;
  public List<EnchantmentDTO> enchantment;
  public Integer enchantmentBonus;
  public MaterialEnum material;
  public Integer cost;
  public String description;

  public Object item;

  // public WeaponNumericEnum damage;
  // public PrerequisiteDTO modifiers;

  public EnchantedItemsDTO(EnchantedItems enchantedItems) {
    this.id = enchantedItems.getId();
    this.name = enchantedItems.getName();
    this.itemId = enchantedItems.getItem().getId();
    this.enchantment =
      enchantedItems.getEnchantment() != null
        ? MapperEnchantment.toEnchantmentDTOList(
          enchantedItems.getEnchantment()
        )
        : null;

    this.material =
      enchantedItems.getMaterial() != null
        ? enchantedItems.getMaterial()
        : null;
    this.cost =
      enchantedItems.getCost() != null ? enchantedItems.getCost() : null;
    this.description = enchantedItems.getDescription();
  }
}
