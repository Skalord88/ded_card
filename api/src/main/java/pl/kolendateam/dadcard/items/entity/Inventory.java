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
import pl.kolendateam.dadcard.items.enchantment.dto.ItemsToSendDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.enchantment.repository.EnchantedItemsRepository;
import pl.kolendateam.dadcard.items.repository.ItemsRepository;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
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

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "ring_one_id", referencedColumnName = "id")
  WondrousItems ringOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "ring_two_id", referencedColumnName = "id")
  WondrousItems ringTwo;

  // @ManyToMany(cascade = CascadeType.MERGE)
  // @JoinTable(
  //   name = "hands",
  //   joinColumns = @JoinColumn(name = "inventory_id"),
  //   inverseJoinColumns = @JoinColumn(name = "items_id")
  // )
  // List<WondrousItems> hands;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "cloth_id", referencedColumnName = "id")
  WondrousItems cloth;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "cloak_id", referencedColumnName = "id")
  WondrousItems cloak;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "belt_id", referencedColumnName = "id")
  WondrousItems belt;

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
    this.ringOne = item;
    this.ringTwo = item;
    this.cloth = item;
    this.cloak = item;
    this.belt = item;
    this.legs = item;
  }

  public void addToInventory(
    ItemsToSendDTO inventoryDTO,
    ItemsRepository itemsRepository,
    EnchantedItemsRepository enchantedItemsRepository
  ) {
    if (
      inventoryDTO == null ||
      (inventoryDTO.backpack.isEmpty() && inventoryDTO.inventory.isEmpty())
    ) {
      return;
    }

    List<EnchantedItems> enchantedItemsList = enchantedItemsRepository.findAll();

    EnchantedItemsDTO dto = inventoryDTO.inventory.get(0);
    EnchantedItems newArmor = new EnchantedItems(dto, itemsRepository);

    Optional<EnchantedItems> existingOpt = enchantedArmorShieldWeaponExist(
      newArmor,
      enchantedItemsList
    );

    if (existingOpt.isPresent()) {
      this.armor = existingOpt.get();
    } else {
      this.armor = enchantedItemsRepository.save(newArmor);
    }

    System.out.println("Armor updated: " + this.armor);

    dto = inventoryDTO.inventory.get(1);
    EnchantedItems newShield = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newShield, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.shield = existingOpt.get();
    } else {
      this.shield = enchantedItemsRepository.save(newShield);
    }

    System.out.println("Shield updated: " + this.shield);

    dto = inventoryDTO.inventory.get(2);
    EnchantedItems newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponOne = existingOpt.get();
    } else {
      this.weaponOne = enchantedItemsRepository.save(newWeapon);
    }

    System.out.println("weaponOne updated: " + this.weaponOne);

    dto = inventoryDTO.inventory.get(3);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponTwo = existingOpt.get();
    } else {
      this.weaponTwo = enchantedItemsRepository.save(newWeapon);
    }

    System.out.println("weaponTwo updated: " + this.weaponTwo);

    dto = inventoryDTO.inventory.get(4);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponThree = existingOpt.get();
    } else {
      this.weaponThree = enchantedItemsRepository.save(newWeapon);
    }

    System.out.println("weaponThree updated: " + this.weaponThree);

    dto = inventoryDTO.inventory.get(5);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponFour = existingOpt.get();
    } else {
      this.weaponFour = enchantedItemsRepository.save(newWeapon);
    }

    System.out.println("weaponFour updated: " + this.weaponFour);

    dto = inventoryDTO.inventory.get(6);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponFive = existingOpt.get();
    } else {
      this.weaponFive = enchantedItemsRepository.save(newWeapon);
    }

    System.out.println("weaponFive updated: " + this.weaponFive);
    // WondrousItemsDTO dtoItem = inventoryDTO.inventory.get(8);
    // newWeapon = new EnchantedItems(dto, itemsRepository);

    // existingOpt =
    //   enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    // if (existingOpt.isPresent()) {
    //   this.weaponFive = existingOpt.get();
    // } else {
    //   this.weaponFive = enchantedItemsRepository.save(newWeapon);
    // }

    // System.out.println("weaponFive updated: " + this.weaponFive);
  }

  public Optional<EnchantedItems> enchantedArmorShieldWeaponExist(
    EnchantedItems newEnchanted,
    List<EnchantedItems> enchantedItemsList
  ) {
    return enchantedItemsList
      .stream()
      .filter(en ->
        Objects.equals(newEnchanted.getItem(), en.getItem()) &&
        Objects.equals(newEnchanted.getMaterial(), en.getMaterial()) &&
        newEnchanted.getEnchantmentBonus() == en.getEnchantmentBonus() &&
        newEnchanted.getEnchantment() == en.getEnchantment()
      )
      .findFirst();
  }
}
