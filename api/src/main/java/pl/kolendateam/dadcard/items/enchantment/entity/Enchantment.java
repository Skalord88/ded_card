package pl.kolendateam.dadcard.items.enchantment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.modifier.MapperModifierBonus;
import pl.kolendateam.dadcard.modifier.entity.ModifierBonus;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Enchantment implements Serializable {

  @Id
  int id;

  int enchantment;

  @Enumerated(EnumType.STRING)
  ItemAbilityEnum ability;

  @JdbcTypeCode(SqlTypes.JSON)
  Set<ModifierBonus> modifiers;

  int cost;

  public Enchantment(EnchantmentDTO enchantmentDTO) {
    this.id = enchantmentDTO.id;
    this.enchantment = enchantmentDTO.enchantment;
    this.ability = enchantmentDTO.ability;
    this.modifiers =
      MapperModifierBonus.toListModifier(enchantmentDTO.modifiers);
  }
}
