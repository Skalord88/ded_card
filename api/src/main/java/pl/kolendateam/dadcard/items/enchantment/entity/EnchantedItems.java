package pl.kolendateam.dadcard.items.enchantment.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.feats.entity.Prerequisite;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.entity.MaterialEnum;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
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

  Integer cost;
  String description;

  public EnchantedItems(
    EnchantedItemsDTO dto,
    ItemsRepository itemsRepository
  ) {
    Optional<Items> itemOpt = itemsRepository.findById(dto.itemId);

    if (itemOpt.isPresent()) {
      this.item = itemOpt.get();
    } else {
      throw new EntityNotFoundException(
        "Item with ID " + dto.itemId + " not found"
      );
    }

    this.enchantmentBonus = dto.enchantmentBonus;
    this.material = dto.material;

    System.out.println("Assigned item: " + this.item);
  }
}
