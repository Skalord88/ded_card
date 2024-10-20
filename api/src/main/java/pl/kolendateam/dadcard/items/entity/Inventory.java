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
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.enchantment.entity.EnchantedItems;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

@Getter
@Setter
@Entity
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

  public void addToInventory(InventoryDTO inventoryDTO, List<Items> itemsList) {
    // if (inventoryDTO.armor != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.armor.id) {
    //       this.armor = (EnchantedItems) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.shield != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.shield.id) {
    //       this.shield = (Shields) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.weaponOne != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.weaponOne.id) {
    //       this.weaponOne = (Weapons) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.weaponTwo != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.weaponTwo.id) {
    //       this.weaponTwo = (Weapons) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.weaponThree != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.weaponThree.id) {
    //       this.weaponThree = (Weapons) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.weaponFour != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.weaponFour.id) {
    //       this.weaponFour = (Weapons) item;
    //       break;
    //     }
    //   }
    // }
    // if (inventoryDTO.weaponFive != null) {
    //   for (Items item : itemsList) {
    //     if (item.id == inventoryDTO.weaponFive.id) {
    //       this.weaponFive = (Weapons) item;
    //       break;
    //     }
    //   }
    // }
    if (inventoryDTO.backpack != null || inventoryDTO.backpack.size() > 0) {
      this.backpack = MapperItems.toListItems(inventoryDTO.backpack, itemsList);
    }
    if (inventoryDTO.head != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.head.id) {
          this.head = (WondrousItems) item;
          break;
        }
      }
    }
    if (inventoryDTO.neck != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.neck.id) {
          this.neck = (WondrousItems) item;
          break;
        }
      }
    }
    if (inventoryDTO.arms != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.arms.id) {
          this.arms = (WondrousItems) item;
          break;
        }
      }
    }
    if (inventoryDTO.hands != null || inventoryDTO.hands.size() > 0) {
      this.hands = MapperItems.toListItems(inventoryDTO.hands, itemsList);
    }
    if (inventoryDTO.cloth != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.cloth.id) {
          this.cloth = (WondrousItems) item;
          break;
        }
      }
    }
    if (inventoryDTO.legs != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.legs.id) {
          this.legs = (WondrousItems) item;
          break;
        }
      }
    }
  }
}
