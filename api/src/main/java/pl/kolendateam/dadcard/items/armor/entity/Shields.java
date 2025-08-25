package pl.kolendateam.dadcard.items.armor.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.entity.Item;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DiscriminatorValue(value = "SHIELD")
public class Shields extends Item {

  @Enumerated(EnumType.STRING)
  ArmorsEnum shieldName;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  // int maxDex;
  int penality;
  int failure;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  public Shields(ShieldsDTO shield) {
    super(shield);
    this.shieldName = shield.shieldName;
    // this.modifiers = MapperModifierBonus.toListModifier(shield.modifiers);
    this.armorType = shield.armorType;
    // this.maxDex = shield.maxDex;
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
