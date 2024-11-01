package pl.kolendateam.dadcard.items.dto;

import java.io.Serializable;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.enchantment.dto.EnchantedItemsDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;

@NoArgsConstructor
public class InventoryDTO implements Serializable {

  public int id;
  public EnchantedItemsDTO armor;
  public EnchantedItemsDTO shield;
  public EnchantedItemsDTO weaponOne;
  public EnchantedItemsDTO weaponTwo;
  public EnchantedItemsDTO weaponThree;
  public EnchantedItemsDTO weaponFour;
  public EnchantedItemsDTO weaponFive;
  public ArrayList<WondrousItemsDTO> backpack;
  public WondrousItemsDTO head;
  public WondrousItemsDTO neck;
  public WondrousItemsDTO arms;
  public ArrayList<WondrousItemsDTO> hands;
  public WondrousItemsDTO cloth;
  public WondrousItemsDTO legs;

  public InventoryDTO(Inventory inventory) {
    this.id = inventory.getId();
    this.armor = MapperItemsDTO.toEnchantedItemsDTO(inventory.getArmor());
    this.shield = MapperItemsDTO.toEnchantedItemsDTO(inventory.getShield());
    this.weaponOne =
      MapperItemsDTO.toEnchantedItemsDTO(inventory.getWeaponOne());
    this.weaponTwo =
      MapperItemsDTO.toEnchantedItemsDTO(inventory.getWeaponTwo());
    this.weaponThree =
      MapperItemsDTO.toEnchantedItemsDTO(inventory.getWeaponThree());
    this.weaponFour =
      MapperItemsDTO.toEnchantedItemsDTO(inventory.getWeaponFour());
    this.weaponFive =
      MapperItemsDTO.toEnchantedItemsDTO(inventory.getWeaponFive());

    if (inventory.getBackpack() != null) {
      this.backpack = MapperItemsDTO.toListItemsDTO(inventory.getBackpack());
    }
    if (inventory.getHead() != null) {
      this.head = MapperItemsDTO.toWondrousItemsDTO(inventory.getHead());
    } else {
      this.head = null;
    }
    if (inventory.getNeck() != null) {
      this.neck = MapperItemsDTO.toWondrousItemsDTO(inventory.getNeck());
    } else {
      this.head = null;
    }
    if (inventory.getArms() != null) {
      this.arms = MapperItemsDTO.toWondrousItemsDTO(inventory.getArms());
    } else {
      this.arms = null;
    }
    if (inventory.getHands() != null) {
      this.hands = MapperItemsDTO.toListItemsDTO(inventory.getHands());
    }
    if (inventory.getCloth() != null) {
      this.cloth = MapperItemsDTO.toWondrousItemsDTO(inventory.getCloth());
    } else {
      this.head = null;
    }
    if (inventory.getLegs() != null) {
      this.legs = MapperItemsDTO.toWondrousItemsDTO(inventory.getLegs());
    }
  }
}
