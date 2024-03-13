package pl.kolendateam.dadcard.items.dto;

import java.util.ArrayList;
import java.util.HashMap;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShildsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WonderousItemsDTO;

public class InventoryDTO {

  public ArmorsDTO armor;
  public ShildsDTO shild;
  public WeaponsDTO weaponOne;
  public WeaponsDTO weaponTwo;
  public WeaponsDTO weaponThree;
  public WeaponsDTO weaponFour;
  public WeaponsDTO weaponFive;
  public ArrayList<WonderousItemsDTO> weaponList;
  public HashMap<String, WonderousItemsDTO[]> body;
  public ArrayList<WonderousItemsDTO> backpack;
  //   body: {
  //     head: noneItem,
  //     arms: noneItem,
  //     hands: [noneItem,noneItem],
  //     neck: noneItem,
  //     cloth: noneItem,
  //     legs: noneItem
  //   }
}
