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
    this.armor = MapperItemsDTO.toArmorDTO(inventory.getArmor());
    this.shield = MapperItemsDTO.toShieldDTO(inventory.getShield());
    this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponOne());
    this.weaponTwo = MapperItemsDTO.toWeaponDTO(inventory.getWeaponTwo());
    this.weaponThree = MapperItemsDTO.toWeaponDTO(inventory.getWeaponThree());
    this.weaponFour = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFour());
    this.weaponFive = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFive());

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
