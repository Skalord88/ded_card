package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.dto.ItemsDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class MapperItemsDTO {

  public static ArmorsDTO toArmorDTO(Armors item) {
    return new ArmorsDTO(item);
  }

  public static ShieldsDTO toShieldDTO(Shields item) {
    return new ShieldsDTO(item);
  }

  public static WeaponsDTO toWeaponDTO(Weapons item) {
    return new WeaponsDTO(item);
  }

  public static ItemsDTO toItemsDTO(Items item) {
    return new ItemsDTO(item);
  }

  public static WondrousItemsDTO toWondrousItemsDTO(WondrousItems item) {
    return new WondrousItemsDTO(item);
  }

  public static InventoryDTO toInventoryDTO(Inventory inventory) {
    return new InventoryDTO(inventory);
  }

  public static ArrayList<WondrousItemsDTO> toListItemsDTO(List<WondrousItems> backpack) {
    ArrayList<WondrousItemsDTO> itemsListDTO = new ArrayList<WondrousItemsDTO>();

    backpack.forEach(item -> {
      itemsListDTO.add(new WondrousItemsDTO(item));
    });

    return itemsListDTO;
  }

}
