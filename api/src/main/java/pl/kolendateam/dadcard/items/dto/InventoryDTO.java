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

    this.armor =
      inventory.getArmor() != null &&
        inventory.getArmor().getItem() instanceof Armors
        ? MapperItemsDTO.toArmorDTO(inventory.getArmor())
        : null;

    this.shield =
      inventory.getShield() != null &&
        inventory.getShield().getItem() instanceof Shields
        ? MapperItemsDTO.toShieldDTO(inventory.getShield())
        : null;

    // weaponOne
    this.weaponOne =
      inventory.getWeaponOne() != null &&
        inventory.getWeaponOne().getItem() instanceof Weapons
        ? MapperItemsDTO.toWeaponDTO(inventory.getWeaponOne())
        : null;

    // weaponTwo
    this.weaponTwo =
      inventory.getWeaponTwo() != null &&
        inventory.getWeaponTwo().getItem() instanceof Weapons
        ? this.weaponTwo = MapperItemsDTO.toWeaponDTO(inventory.getWeaponTwo())
        : null;

    // weaponThree
    this.weaponThree =
      inventory.getWeaponThree() != null &&
        inventory.getWeaponThree().getItem() instanceof Weapons
        ? MapperItemsDTO.toWeaponDTO(inventory.getWeaponThree())
        : null;

    // weaponFour
    this.weaponFour =
      inventory.getWeaponFour() != null &&
        inventory.getWeaponFour().getItem() instanceof Weapons
        ? MapperItemsDTO.toWeaponDTO(inventory.getWeaponFour())
        : null;

    // weaponFive
    this.weaponFive =
      inventory.getWeaponFive() != null &&
        inventory.getWeaponFive().getItem() instanceof Weapons
        ? MapperItemsDTO.toWeaponDTO(inventory.getWeaponFive())
        : null;

    this.backpack =
      inventory.getBackpack() != null
        ? MapperItemsDTO.toListWondrousItemsDTO(inventory.getBackpack())
        : new ArrayList<WondrousItemsDTO>();

    this.head =
      inventory.getHead() != null
        ? MapperItemsDTO.toWondrousItemsDTO(inventory.getHead())
        : null;

    this.neck =
      inventory.getNeck() != null
        ? MapperItemsDTO.toWondrousItemsDTO(inventory.getNeck())
        : null;

    this.arms =
      inventory.getArms() != null
        ? MapperItemsDTO.toWondrousItemsDTO(inventory.getArms())
        : null;

    this.hands =
      inventory.getHands() != null
        ? MapperItemsDTO.toListWondrousItemsDTO(inventory.getHands())
        : new ArrayList<WondrousItemsDTO>();

    this.cloth =
      inventory.getCloth() != null
        ? MapperItemsDTO.toWondrousItemsDTO(inventory.getCloth())
        : null;

    this.legs =
      inventory.getLegs() != null
        ? MapperItemsDTO.toWondrousItemsDTO(inventory.getLegs())
        : null;
  }
}
