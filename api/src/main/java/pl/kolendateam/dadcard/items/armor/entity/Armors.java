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
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.MapperEnchantment;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.entity.Enchantment;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue(value = "ARMOR")
public class Armors extends Items {

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorName;

  @Enumerated(EnumType.STRING)
  ArmorsEnum armorType;

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "enchantment_id", referencedColumnName = "id")
  Enchantment enchantment;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  // int armorClass;
  int maxDex;
  int penality;
  int failure;

  public void setItemType(ItemTypeEnum itemType) {}

  public Armors(int idZero) {
    super(idZero);
  }

  public Armors(ArmorsDTO armorDTO) {
    super(armorDTO);
    this.armorName = armorDTO.armorName;
    this.modifiers = MapperModifierBonus.toListModifier(armorDTO.modifiers);
    this.armorType = armorDTO.armorType;
    this.maxDex = armorDTO.maxDex;
    this.penality = armorDTO.penality;
    this.failure = armorDTO.failure;
    this.material = armorDTO.material;
    if (armorDTO.enchantment == null) {
      armorDTO.enchantment = new EnchantmentDTO(0, 0);
    } else {
      this.enchantment = MapperEnchantment.toEnchantment(armorDTO.enchantment);
    }
  }

  public boolean checkEqualItem(Armors arm) {
    return (
      this.getEnchantment().equals(arm.getEnchantment()) &&
      this.getArmorType().equals(arm.getArmorType()) &&
      this.getFailure() == arm.getFailure() &&
      this.getPenality() == arm.getPenality() &&
      this.getMaterial().equals(arm.getMaterial())
    );
  }
}
