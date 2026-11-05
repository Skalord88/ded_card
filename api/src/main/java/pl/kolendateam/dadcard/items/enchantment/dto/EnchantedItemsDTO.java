package pl.kolendateam.dadcard.items.enchantment.dto;

import java.util.List;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.ItemDTO;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;

@ToString
@NoArgsConstructor
public class EnchantedItemsDTO {

  public Integer id;
  public Integer itemId;
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
    this.name =
      enchantedItems.getName() != null ? enchantedItems.getName() : null;
    this.itemId =
      enchantedItems.getItem() != null
        ? enchantedItems.getItem().getId()
        : null;
    this.enchantmentBonus = enchantedItems.getEnchantmentBonus();
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

    this.item =
      enchantedItems.getItem() != null
        ? enchantedItems.getItem() instanceof Weapons
          ? new WeaponsDTO((Weapons) enchantedItems.getItem())
          : enchantedItems.getItem() instanceof Armors
            ? new ArmorsDTO((Armors) enchantedItems.getItem())
            : enchantedItems.getItem() instanceof Shields
              ? new ShieldsDTO((Shields) enchantedItems.getItem())
              : new ItemDTO(enchantedItems.getItem())
        : null;
  }
}
