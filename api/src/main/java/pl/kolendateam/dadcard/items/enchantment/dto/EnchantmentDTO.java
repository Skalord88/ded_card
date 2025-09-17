package pl.kolendateam.dadcard.items.enchantment.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.enchantment.entity.ItemAbilityEnum;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.modifier.MapperPrerequisiteBonus;
import pl.kolendateam.dadcard.modifier.dto.PrerequisiteDTO;

@AllArgsConstructor
@NoArgsConstructor
public class EnchantmentDTO implements Serializable {

  public int id;
  public ItemTypeEnum itemType;
  public PrerequisiteDTO modifiers;
  // public SpecialAbilitiesDTO specialAbilities;
  public ItemAbilityEnum ability;
  public int cost;
  public String text;

  public EnchantmentDTO(Enchantment enchantment) {
    this.id = enchantment.getId();
    this.itemType = enchantment.getItemType();
    this.modifiers =
      enchantment.getModifiers() != null
        ? MapperPrerequisiteBonus.toPrerequisiteDTO(enchantment.getModifiers())
        : null;
    // this.specialAbilities =
    //   enchantment.getSpecialAbilities() != null
    //     ? MapperSpecialAbilities.toSpecialAbilityDTO(
    //       enchantment.getSpecialAbilities()
    //     )
    //     : null;
    this.ability = enchantment.getAbility();
    this.cost = enchantment.getCost();
    this.text = enchantment.getText();
  }
}
