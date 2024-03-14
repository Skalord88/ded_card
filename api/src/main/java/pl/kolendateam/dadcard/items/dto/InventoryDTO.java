package pl.kolendateam.dadcard.items.dto;

import java.util.ArrayList;
import java.util.HashMap;
import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class InventoryDTO {

  public ArmorsDTO armor;
  public ShieldsDTO shield;
  public WeaponsDTO weaponOne;
  public WeaponsDTO weaponTwo;
  public WeaponsDTO weaponThree;
  public WeaponsDTO weaponFour;
  public WeaponsDTO weaponFive;
  public ArrayList<WeaponsDTO> weaponList;
  public HashMap<String, WondrousItemsDTO[]> body;
  public ArrayList<WondrousItemsDTO> backpack;

  public InventoryDTO(Inventory inventory) {
    if (inventory.getArmor() == null) {
      this.armor = null;
    } else {
      this.armor = MapperItemsDTO.toArmorDTO(inventory.getArmor());
    }
    if (inventory.getShild() == null) {
      this.shield = null;
    } else {
      this.shield = MapperItemsDTO.toShieldDTO(inventory.getShild());
    }
    if (inventory.getWeaponOne() == null) {
      this.weaponOne = null;
    } else {
      this.weaponOne = MapperItemsDTO.toWeaponDTO(inventory.getWeaponOne());
    }
    if (inventory.getWeaponTwo() == null) {
      this.weaponTwo = null;
    } else {
      this.weaponTwo = MapperItemsDTO.toWeaponDTO(inventory.getWeaponTwo());
    }
    if (inventory.getWeaponThree() == null) {
      this.weaponThree = null;
    } else {
      this.weaponThree = MapperItemsDTO.toWeaponDTO(inventory.getWeaponThree());
    }
    if (inventory.getWeaponFour() == null) {
      this.weaponFour = null;
    } else {
      this.weaponFour = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFour());
    }
    if (inventory.getWeaponFive() == null) {
      this.weaponFive = null;
    } else {
      this.weaponFive = MapperItemsDTO.toWeaponDTO(inventory.getWeaponFive());
    }
    if (inventory.getWeaponList() == null) {
      this.weaponList = new ArrayList<WeaponsDTO>();
    } else {
      this.weaponList =
        MapperItemsDTO.toArrayWeaponsDTOList(inventory.getWeaponList());
    }
    if (inventory.getBody() == null) {
      HashMap<String, WondrousItems[]> bodyEmpty = new HashMap<String, WondrousItems[]>();
      this.body = MapperItemsDTO.toBodyMapDTO(bodyEmpty);
    } else {
      this.body = MapperItemsDTO.toBodyMapDTO(inventory.getBody());
    }
    if (inventory.getBackpack() == null) {
      this.backpack = new ArrayList<WondrousItemsDTO>();
    } else {
      MapperItemsDTO.toArrayWonderousItemsDTOList(inventory.getBackpack());
    }
  }
}
