package pl.kolendateam.dadcard.items.enchantment.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.feats.dto.PrerequisiteDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.ItemAbilityEnum;

@AllArgsConstructor
@NoArgsConstructor
public class EnchantmentDTO implements Serializable {

  public int id;
  // public ModifierBonus enchantment;
  public int enchantment;
  public PrerequisiteDTO modifiers;
  public ItemAbilityEnum ability;
  public int cost;
  public String text;

  public EnchantmentDTO(Enchantment enchantment) {
    this.id = enchantment.getId();
    this.enchantment = enchantment.getEnchantment();
    this.modifiers =
      enchantment.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(enchantment.getModifiers())
        : null;
    this.ability = enchantment.getAbility();
    this.cost = enchantment.getCost();
    this.text = enchantment.getText();
  }
}
