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
import lombok.Setter;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.entity.Enchantment;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue(value = "ARMOR")
public class Armors extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorName;

  int armorClass;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  int maxDex;
  int penality;
  int failure;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "enchantment_id", referencedColumnName = "id")
  Enchantment enchantment;

  public void setItemType(ItemTypeEnum itemType) {
  }

  public Armors(int idZero) {
    super(idZero);
  }

  public Armors(ArmorsDTO armorDTO) {
    super(armorDTO);
    this.armorName = armorDTO.armorName;
    this.armorClass = armorDTO.armorClass;
    this.armorType = armorDTO.armorType;
    this.maxDex = armorDTO.maxDex;
    this.penality = armorDTO.penality;
    this.failure = armorDTO.failure;
    this.material = armorDTO.material;
    if (armorDTO.enchantment == null) {
      armorDTO.enchantment = null;
    } else {
      this.enchantment = MapperEnchantment.toEnchantment(armorDTO.enchantment.id);
    }
  }

  public boolean checkEqual(Armors item) {

    if (this.armorType == item.armorType) {
      if (this.maxDex == item.maxDex) {
        if (this.penality == item.penality) {
          if (this.failure == item.failure) {
            if (this.material == item.material) {
              if (this.enchantment.hashCode() == item.enchantment.hashCode()) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

}
