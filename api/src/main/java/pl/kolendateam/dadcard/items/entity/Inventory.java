package pl.kolendateam.dadcard.items.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Version;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.ItemsToSendDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.enchantment.entity.Enchantment;
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

  @ManyToOne
  @JoinColumn(name = "armor_id", referencedColumnName = "id")
  EnchantedItems armor; // 1

  @ManyToOne
  @JoinColumn(name = "shield_id", referencedColumnName = "id")
  EnchantedItems shield; // 2

  @ManyToOne
  @JoinColumn(name = "weapon_id_one", referencedColumnName = "id")
  EnchantedItems weaponOne; // 3

  @ManyToOne
  @JoinColumn(name = "weapon_id_two", referencedColumnName = "id")
  EnchantedItems weaponTwo; // 4

  @ManyToOne
  @JoinColumn(name = "weapon_id_three", referencedColumnName = "id")
  EnchantedItems weaponThree; // 5

  @ManyToOne
  @JoinColumn(name = "weapon_id_four", referencedColumnName = "id")
  EnchantedItems weaponFour; // 6

  @ManyToOne
  @JoinColumn(name = "weapon_id_five", referencedColumnName = "id")
  EnchantedItems weaponFive; // 7

  @ManyToMany
  @JoinTable(
    name = "backpack",
    joinColumns = @JoinColumn(name = "inventory_id"),
    inverseJoinColumns = @JoinColumn(name = "items_id")
  )
  List<WondrousItems> backpack;

  @ManyToOne
  @JoinColumn(name = "head_id", referencedColumnName = "id")
  WondrousItems head; // 8

  @ManyToOne
  @JoinColumn(name = "neck_id", referencedColumnName = "id")
  WondrousItems neck; // 9

  @ManyToOne
  @JoinColumn(name = "arms_id", referencedColumnName = "id")
  WondrousItems arms; // 10

  @ManyToOne
  @JoinColumn(name = "ring_one_id", referencedColumnName = "id")
  WondrousItems ringOne; // 11

  @ManyToOne
  @JoinColumn(name = "ring_two_id", referencedColumnName = "id")
  WondrousItems ringTwo; // 12

  @ManyToOne
  @JoinColumn(name = "cloth_id", referencedColumnName = "id")
  WondrousItems cloth; // 13

  @ManyToOne
  @JoinColumn(name = "cloak_id", referencedColumnName = "id")
  WondrousItems cloak; // 14

  @ManyToOne
  @JoinColumn(name = "belt_id", referencedColumnName = "id")
  WondrousItems belt; // 15

  @ManyToOne
  @JoinColumn(name = "legs_id", referencedColumnName = "id")
  WondrousItems legs; // 16

  @Version
  Integer version;

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
    this.version = 1;
  }

  public Inventory(int idChar) {
    this.id = idChar;
    this.version = 1;
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

    dto = inventoryDTO.inventory.get(1);
    EnchantedItems newShield = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newShield, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.shield = existingOpt.get();
    } else {
      this.shield = enchantedItemsRepository.save(newShield);
    }

    dto = inventoryDTO.inventory.get(2);
    EnchantedItems newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponOne = existingOpt.get();
    } else {
      this.weaponOne = enchantedItemsRepository.save(newWeapon);
    }

    dto = inventoryDTO.inventory.get(3);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponTwo = existingOpt.get();
    } else {
      this.weaponTwo = enchantedItemsRepository.save(newWeapon);
    }

    dto = inventoryDTO.inventory.get(4);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponThree = existingOpt.get();
    } else {
      this.weaponThree = enchantedItemsRepository.save(newWeapon);
    }

    dto = inventoryDTO.inventory.get(5);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponFour = existingOpt.get();
    } else {
      this.weaponFour = enchantedItemsRepository.save(newWeapon);
    }

    dto = inventoryDTO.inventory.get(6);
    newWeapon = new EnchantedItems(dto, itemsRepository);

    existingOpt =
      enchantedArmorShieldWeaponExist(newWeapon, enchantedItemsList);

    if (existingOpt.isPresent()) {
      this.weaponFive = existingOpt.get();
    } else {
      this.weaponFive = enchantedItemsRepository.save(newWeapon);
    }

    // head
    EnchantedItemsDTO dtoItem = inventoryDTO.inventory.get(7);
    Optional<Items> itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    Items existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.head == null) {
        this.head = (WondrousItems) existingItem;
      } else {
        if (this.head.getId() != existingItem.getId()) {
          this.head = (WondrousItems) existingItem;
        }
      }
    }

    // neck
    dtoItem = inventoryDTO.inventory.get(8);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.neck == null) {
        this.neck = (WondrousItems) existingItem;
      } else {
        if (this.neck.getId() != existingItem.getId()) {
          this.neck = (WondrousItems) existingItem;
        }
      }
    }

    System.out.println("neck updated: " + this.neck);

    dtoItem = inventoryDTO.inventory.get(9);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.arms == null) {
        this.arms = (WondrousItems) existingItem;
      } else {
        if (this.arms.getId() != existingItem.getId()) {
          this.arms = (WondrousItems) existingItem;
        }
      }
    }

    // ringOne
    dtoItem = inventoryDTO.inventory.get(10);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.ringOne == null) {
        this.ringOne = (WondrousItems) existingItem;
      } else {
        if (this.ringOne.getId() != existingItem.getId()) {
          this.ringOne = (WondrousItems) existingItem;
        }
      }
    }

    // ringTwo
    dtoItem = inventoryDTO.inventory.get(11);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.ringTwo == null) {
        this.ringTwo = (WondrousItems) existingItem;
      } else {
        if (this.ringTwo.getId() != existingItem.getId()) {
          this.ringTwo = (WondrousItems) existingItem;
        }
      }
    }

    // cloth
    dtoItem = inventoryDTO.inventory.get(12);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.cloth == null) {
        this.cloth = (WondrousItems) existingItem;
      } else {
        if (this.cloth.getId() != existingItem.getId()) {
          this.cloth = (WondrousItems) existingItem;
        }
      }
    }

    // cloak
    dtoItem = inventoryDTO.inventory.get(13);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.cloak == null) {
        this.cloak = (WondrousItems) existingItem;
      } else {
        if (this.cloak.getId() != existingItem.getId()) {
          this.cloak = (WondrousItems) existingItem;
        }
      }
    }

    // belt
    dtoItem = inventoryDTO.inventory.get(14);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.belt == null) {
        this.belt = (WondrousItems) existingItem;
      } else {
        if (this.belt.getId() != existingItem.getId()) {
          this.belt = (WondrousItems) existingItem;
        }
      }
    }

    // legs
    dtoItem = inventoryDTO.inventory.get(15);
    itemOpt = itemsRepository.findById(dtoItem.id);
    if (!itemOpt.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item Not Found");
    }
    existingItem = itemOpt.get();

    if (existingItem != null && existingItem instanceof WondrousItems) {
      if (this.legs == null) {
        this.legs = (WondrousItems) existingItem;
      } else {
        if (this.legs.getId() != existingItem.getId()) {
          this.legs = (WondrousItems) existingItem;
        }
      }
    }

    List<EnchantedItemsDTO> dtoItemList = inventoryDTO.backpack;
    List<Items> backpackItems = itemsRepository.findAllById(
      dtoItemList.stream().map(i -> i.id).toList()
    );
    if (backpackItems != null) {
      List<WondrousItems> newBackpack = new ArrayList<WondrousItems>();
      for (Items item : backpackItems) {
        if (item instanceof WondrousItems) {
          newBackpack.add((WondrousItems) item);
        }
      }
      if (newBackpack.size() > 0) {
        this.backpack = newBackpack;
      }
    }
  }

  public Optional<EnchantedItems> enchantedArmorShieldWeaponExist(
    EnchantedItems newEnchanted,
    List<EnchantedItems> enchantedItemsList
  ) {
    return enchantedItemsList
      .stream()
      .filter(en ->
        newEnchanted.getItem().getId() == en.getItem().getId() &&
        Objects.equals(newEnchanted.getMaterial(), en.getMaterial()) &&
        newEnchanted.getEnchantmentBonus() == en.getEnchantmentBonus() &&
        areEnchantmentsEqualById(
          newEnchanted.getEnchantment(),
          en.getEnchantment()
        )
      )
      .findFirst();
  }

  private boolean areEnchantmentsEqualById(
    List<Enchantment> list1,
    List<Enchantment> list2
  ) {
    if (list1 == null && list2 == null) {
      return true;
    }
    if (list1 == null || list2 == null || list1.size() != list2.size()) {
      return false;
    }

    // Creare una mappa degli ID per entrambe le liste
    List<Integer> ids1 = list1.stream().map(Enchantment::getId).toList();
    List<Integer> ids2 = list2.stream().map(Enchantment::getId).toList();

    // Confrontare gli ID
    return ids1.containsAll(ids2) && ids2.containsAll(ids1);
  }
}
