package pl.kolendateam.dadcard.items.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantedItemsRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

@Getter
@Setter
@Entity
@ToString
@EqualsAndHashCode
public class Inventory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "armor_id", referencedColumnName = "id")
  EnchantedItems armor;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "shield_id", referencedColumnName = "id")
  EnchantedItems shield;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_one", referencedColumnName = "id")
  EnchantedItems weaponOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_two", referencedColumnName = "id")
  EnchantedItems weaponTwo;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_three", referencedColumnName = "id")
  EnchantedItems weaponThree;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_four", referencedColumnName = "id")
  EnchantedItems weaponFour;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_five", referencedColumnName = "id")
  EnchantedItems weaponFive;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "backpack",
    joinColumns = @JoinColumn(name = "inventory_id"),
    inverseJoinColumns = @JoinColumn(name = "items_id")
  )
  List<WondrousItems> backpack;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "head_id", referencedColumnName = "id")
  WondrousItems head;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "neck_id", referencedColumnName = "id")
  WondrousItems neck;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "arms_id", referencedColumnName = "id")
  WondrousItems arms;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(
    name = "hands",
    joinColumns = @JoinColumn(name = "inventory_id"),
    inverseJoinColumns = @JoinColumn(name = "items_id")
  )
  List<WondrousItems> hands;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "cloth_id", referencedColumnName = "id")
  WondrousItems cloth;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "legs_id", referencedColumnName = "id")
  WondrousItems legs;

  public Inventory() {
    this.armor = new EnchantedItems();
    this.shield = new EnchantedItems();
    EnchantedItems weapon = new EnchantedItems();
    this.weaponOne = weapon;
    this.weaponTwo = weapon;
    this.weaponThree = weapon;
    this.weaponFour = weapon;
    this.weaponFive = weapon;
    WondrousItems item = new WondrousItems(4);
    this.backpack = new ArrayList<WondrousItems>();
    backpack.add(item);
    this.head = item;
    this.neck = item;
    this.arms = item;
    this.hands = new ArrayList<WondrousItems>();
    hands.add(item);
    hands.add(item);
    this.cloth = item;
    this.legs = item;
  }

  public void addToInventory(
    List<EnchantedItemsDTO> inventoryDTO,
    ItemsRepository itemsRepository,
    EnchantedItemsRepository enchantedItemsRepository
  ) {
    if (inventoryDTO == null || inventoryDTO.isEmpty()) {
      return;
    }

    List<EnchantedItems> enchantedItemsList = enchantedItemsRepository.findAll();

    EnchantedItemsDTO dto = inventoryDTO.get(0);
    EnchantedItems newArmor = new EnchantedItems(dto, itemsRepository);

    Optional<EnchantedItems> existingOpt = enchantedArmorShieldExist(
      newArmor,
      enchantedItemsList
    );

    EnchantedItems existing;

    if (existingOpt.isPresent()) {
      existing = existingOpt.get();
      this.armor = existing;
    } else {
      this.armor = enchantedItemsRepository.saveAndFlush(newArmor);
    }

    System.out.println("Armor updated: " + this.armor);
  }

  public Optional<EnchantedItems> enchantedArmorShieldExist(
    EnchantedItems newArmor,
    List<EnchantedItems> enchantedItemsList
  ) {
    return enchantedItemsList
      .stream()
      .filter(en ->
        Objects.equals(newArmor.getItem(), en.getItem()) &&
        Objects.equals(newArmor.getMaterial(), en.getMaterial()) &&
        newArmor.getEnchantmentBonus() == en.getEnchantmentBonus()
      )
      .findFirst();
  }
}
