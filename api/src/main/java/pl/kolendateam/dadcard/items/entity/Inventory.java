package pl.kolendateam.dadcard.items.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import pl.kolendateam.dadcard.items.MapperItems;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
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
  Armors armor;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "shield_id", referencedColumnName = "id")
  Shields shield;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_one", referencedColumnName = "id")
  Weapons weaponOne;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_two", referencedColumnName = "id")
  Weapons weaponTwo;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_three", referencedColumnName = "id")
  Weapons weaponThree;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_four", referencedColumnName = "id")
  Weapons weaponFour;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "weapon_id_five", referencedColumnName = "id")
  Weapons weaponFive;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(name = "backpack", joinColumns = @JoinColumn(name = "inventory_id"), inverseJoinColumns = @JoinColumn(name = "items_id"))
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
  @JoinTable(name = "hands", joinColumns = @JoinColumn(name = "inventory_id"), inverseJoinColumns = @JoinColumn(name = "items_id"))
  List<WondrousItems> hands;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "cloth_id", referencedColumnName = "id")
  WondrousItems cloth;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "legs_id", referencedColumnName = "id")
  WondrousItems legs;

  public Inventory() {
    this.armor = new Armors(2);
    this.shield = new Shields(3);
    Weapons weapon = new Weapons(1);
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

  // public Inventory(InventoryDTO inventoryDTO) {

  // if (inventoryDTO.armor != null) {
  // this.armor = MapperItems.toArmor(inventoryDTO.armor);
  // } else {
  // this.armor = (Armors) new Items();
  // armor.setId(0);
  // }
  // if (inventoryDTO.shield != null) {
  // this.shield = MapperItems.toShield(inventoryDTO.shield);
  // } else {
  // this.shield = (Shields) new Items();
  // shield.setId(0);
  // }
  // if (inventoryDTO.weaponOne != null) {
  // this.weaponOne = MapperItems.toWeapon(inventoryDTO.weaponOne);
  // } else {
  // this.weaponOne = (Weapons) new Items();
  // weaponOne.setId(0);
  // }
  // if (inventoryDTO.weaponTwo != null) {
  // this.weaponTwo = MapperItems.toWeapon(inventoryDTO.weaponTwo);
  // } else {
  // this.weaponTwo = (Weapons) new Items();
  // weaponTwo.setId(0);
  // }
  // if (inventoryDTO.weaponThree != null) {
  // this.weaponThree = MapperItems.toWeapon(inventoryDTO.weaponThree);
  // } else {
  // this.weaponThree = (Weapons) new Items();
  // weaponThree.setId(0);
  // }
  // if (inventoryDTO.weaponFour != null) {
  // this.weaponFour = MapperItems.toWeapon(inventoryDTO.weaponFour);
  // } else {
  // this.weaponFour = (Weapons) new Items();
  // weaponFour.setId(0);
  // }
  // if (inventoryDTO.weaponFive != null) {
  // this.weaponFive = MapperItems.toWeapon(inventoryDTO.weaponFive);
  // } else {
  // this.weaponFive = (Weapons) new Items();
  // weaponFive.setId(0);
  // }
  // if (inventoryDTO.head != null) {
  // this.head = MapperItems.toWondrousItems(inventoryDTO.head);
  // } else {
  // this.head = (WondrousItems) new Items();
  // head.setId(0);
  // }
  // if (inventoryDTO.neck != null) {
  // this.neck = MapperItems.toWondrousItems(inventoryDTO.neck);
  // } else {
  // this.neck = (WondrousItems) new Items();
  // neck.setId(0);
  // }
  // if (inventoryDTO.arms != null) {
  // this.arms = MapperItems.toWondrousItems(inventoryDTO.arms);
  // } else {
  // this.arms = (WondrousItems) new Items();
  // arms.setId(0);
  // }
  // if (inventoryDTO.cloth != null) {
  // this.cloth = MapperItems.toWondrousItems(inventoryDTO.cloth);
  // } else {
  // this.cloth = (WondrousItems) new Items();
  // cloth.setId(0);
  // }
  // if (inventoryDTO.legs != null) {
  // this.legs = MapperItems.toWondrousItems(inventoryDTO.neck);
  // } else {
  // this.legs = (WondrousItems) new Items();
  // legs.setId(0);
  // }
  // }

  public void addToInventory(InventoryDTO inventoryDTO, List<Items> itemsList) {

    if (inventoryDTO.armor != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.armor.id) {
          this.armor = (Armors) item;
          break;
        }
      }
    }
    if (inventoryDTO.shield != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.shield.id) {
          this.shield = (Shields) item;
          break;
        }
      }
    }
    if (inventoryDTO.weaponOne != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.weaponOne.id) {
          this.weaponOne = (Weapons) item;
          break;
        }
      }
    }
    if (inventoryDTO.weaponTwo != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.weaponTwo.id) {
          this.weaponTwo = (Weapons) item;
          break;
        }
      }
    }
    if (inventoryDTO.weaponThree != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.weaponThree.id) {
          this.weaponThree = (Weapons) item;
          break;
        }
      }
    }
    if (inventoryDTO.weaponFour != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.weaponFour.id) {
          this.weaponFour = (Weapons) item;
          break;
        }
      }
    }
    if (inventoryDTO.weaponFive != null) {
      for (Items item : itemsList) {
        if (item.id == inventoryDTO.weaponFive.id) {
          this.weaponFive = (Weapons) item;
          break;
        }
      }
    }
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
