package pl.kolendateam.dadcard.items.armor.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.entity.Enchantment;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DiscriminatorValue(value = "SHIELD")
public class Shields extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum shieldName;

  int armorClass;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  int maxDex;
  int penality;
  int failure;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "enchantment_id", referencedColumnName = "id")
  Enchantment enchantment;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  public Shields(ShieldsDTO shield) {
    super(shield);
    this.shieldName = shield.shieldName;
    this.armorClass = shield.armorClass;
    this.armorType = shield.armorType;
    this.maxDex = shield.maxDex;
    this.penality = shield.penality;
    this.failure = shield.failure;
    if (shield.enchantment == null) {
      this.enchantment = null;
    } else {
      MapperEnchantment.toEnchantment(shield.enchantment);
    }
    this.material = shield.material;
  }

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Shields(int idZero) {
    super(idZero);
  }

}
