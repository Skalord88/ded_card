package pl.kolendateam.dadcard.items.enchantment.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantmentDTO;
import pl.kolendateam.dadcard.items.entity.ItemTypeEnum;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Enchantment implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  @Enumerated(EnumType.STRING)
  ItemTypeEnum itemType;

  @Enumerated(EnumType.STRING)
  ItemAbilityEnum ability;

  int cost;

  String text;

  public Enchantment(EnchantmentDTO enchantmentDTO) {
    this.id = enchantmentDTO.id;
    this.cost = enchantmentDTO.cost;
  }
}
