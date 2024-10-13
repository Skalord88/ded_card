package pl.kolendateam.dadcard.items.dto;

import java.io.Serializable;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;

@NoArgsConstructor
public class InventoryDTO implements Serializable {

  public int id;
  public ArmorsDTO armor;
  public ShieldsDTO shield;
  public WeaponsDTO weaponOne;
  public WeaponsDTO weaponTwo;
  public WeaponsDTO weaponThree;
  public WeaponsDTO weaponFour;
  public WeaponsDTO weaponFive;
  public ArrayList<WondrousItemsDTO> backpack;
  public WondrousItemsDTO head;
  public WondrousItemsDTO neck;
  public WondrousItemsDTO arms;
  public ArrayList<WondrousItemsDTO> hands;
  public WondrousItemsDTO cloth;
  public WondrousItemsDTO legs;

  public InventoryDTO(Inventory inventory) {
    this.id = inventory.getId();

    if (inventory.getArmor() != null) {
      this.armor = MapperItemsDTO.toArmorDTO(inventory.getArmor());
      // this.armor = MapperItemsDTO.toArmorDTO(inventory.getArmor());
    } else {
      this.armor = null;
    }
    if (inventory.getShield() != null) {
      // this.shield = MapperItemsDTO.toShieldDTO(inventory.getShield());
    } else {
      this.shield = null;
    }
    if (inventory.getWeaponOne() != null) {
      // this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponOne());
    } else {
      this.weaponOne = null;
    }
    if (inventory.getWeaponTwo() != null) {
      // this.weaponTwo = MapperItemsDTO.toWeaponDTO(inventory.getWeaponTwo());
    } else {
      this.weaponTwo = null;
    }
    if (inventory.getWeaponThree() != null) {
      // this.weaponThree = MapperItemsDTO.toWeaponDTO(inventory.getWeaponThree());
    } else {
      this.weaponThree = null;
    }
    if (inventory.getWeaponFour() != null) {
      // this.weaponFour = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFour());
    } else {
      this.weaponFour = null;
    }
    if (inventory.getWeaponFive() != null) {
      // this.weaponFive = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFive());
    } else {
      this.weaponFive = null;
    }
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
