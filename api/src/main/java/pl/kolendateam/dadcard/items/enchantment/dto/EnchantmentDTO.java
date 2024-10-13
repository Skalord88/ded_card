package pl.kolendateam.dadcard.items.enchantment.dto;

import java.io.Serializable;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.ItemAbilityEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.dto.ModifierDTO;

@AllArgsConstructor
@NoArgsConstructor
public class EnchantmentDTO implements Serializable {

  public int id;
  public int enchantment;
  public ItemAbilityEnum ability;
  public Set<ModifierDTO> modifiers;
  public int cost;

  public EnchantmentDTO(Enchantment enchantment) {
    this.id = enchantment.getId();
    this.enchantment = enchantment.getEnchantment();
    this.ability = enchantment.getAbility();
    this.modifiers =
      MapperModifierBonus.toListModifierDTO(enchantment.getModifiers());
    this.cost = enchantment.getCost();
  }
}
