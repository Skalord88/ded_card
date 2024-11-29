package pl.kolendateam.dadcard.items.dto;

import java.io.Serializable;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
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
      if (inventory.getArmor().getItem() instanceof Armors) this.armor =
        MapperItemsDTO.toArmorDTO(inventory.getArmor());
    } else {
      this.armor = null;
    }

    if (inventory.getShield() != null) {
      if (inventory.getShield().getItem() instanceof Shields) this.shield =
        MapperItemsDTO.toShieldDTO(inventory.getShield());
    } else {
      this.shield = null;
    }

    if (inventory.getWeaponOne() != null) {
      if (
        inventory.getWeaponOne().getItem() instanceof Weapons
      ) this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponOne());
    } else {
      this.weaponOne = null;
    }

    if (inventory.getWeaponTwo() != null) {
      if (
        inventory.getWeaponTwo().getItem() instanceof Weapons
      ) this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponTwo());
    } else {
      this.weaponOne = null;
    }

    if (inventory.getWeaponThree() != null) {
      if (
        inventory.getWeaponThree().getItem() instanceof Weapons
      ) this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponThree());
    } else {
      this.weaponOne = null;
    }

    if (inventory.getWeaponFour() != null) {
      if (
        inventory.getWeaponFour().getItem() instanceof Weapons
      ) this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFour());
    } else {
      this.weaponOne = null;
    }

    if (inventory.getWeaponFive() != null) {
      if (
        inventory.getWeaponFive().getItem() instanceof Weapons
      ) this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFive());
    } else {
      this.weaponOne = null;
    }

    if (inventory.getBackpack() != null) {
      this.backpack =
        MapperItemsDTO.toListWondrousItemsDTO(inventory.getBackpack());
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
      this.hands = MapperItemsDTO.toListWondrousItemsDTO(inventory.getHands());
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
