package pl.kolendateam.dadcard.items.enchantment.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.weapons.entity.WeaponNumericEnum;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EnchantedItems implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  String name;

  @OneToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "items_id", referencedColumnName = "id")
  Items item;

  @Enumerated(EnumType.STRING)
  WeaponNumericEnum damage;

  Integer enchantmentBonus;

  @ManyToMany
  @JoinTable(
    name = "enchanted_items_enchantment",
    joinColumns = @JoinColumn(name = "enchanted_items_id"),
    inverseJoinColumns = @JoinColumn(name = "enchantment_id")
  )
  List<Enchantment> enchantment = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  MaterialEnum material;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(
    name = "modifiers_id",
    referencedColumnName = "id",
    nullable = true
  )
  Prerequisite modifiers;

  String description;
}
