package pl.kolendateam.dadcard.items.armor.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.enchantment.MapperEnchantment;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DiscriminatorValue(value = "SHIELD")
public class Shields extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum shieldName;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  int maxDex;
  int penality;
  int failure;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  // @ManyToOne(cascade = CascadeType.MERGE)
  // @JoinColumn(name = "enchantment_id", referencedColumnName = "id")
  // Enchantment enchantment;

  public Shields(ShieldsDTO shield) {
    super(shield);
    this.shieldName = shield.shieldName;
    this.modifiers = MapperModifierBonus.toListModifier(shield.modifiers);
    this.armorType = shield.armorType;
    this.maxDex = shield.maxDex;
    this.penality = shield.penality;
    this.failure = shield.failure;
    this.material = shield.material;
    // if (shield.enchantment == null) {
    //   this.enchantment =  new Enchantment(0, 0);
    // } else {
    //   this.enchantment = MapperEnchantment.toEnchantment(shield.enchantment);
    // }
  }

  public void setItemType(ItemTypeEnum itemType) {}

  public Shields(int idZero) {
    super(idZero);
  }
}
