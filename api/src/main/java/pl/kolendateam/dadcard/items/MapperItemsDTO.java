package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.HashMap;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.dto.InventoryDTO;
import pl.kolendateam.dadcard.items.entity.Inventory;
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

  public static WondrousItemsDTO toWondrousItemsDTO(WondrousItems item) {
    return new WondrousItemsDTO(item);
  }

  public static WondrousItemsDTO[] toWondrousItemsArrayDTO(
    WondrousItems[] items
  ) {
    WondrousItemsDTO i = MapperItemsDTO.toWondrousItemsDTO(items[0]);
    WondrousItemsDTO[] wonderousArray = new WondrousItemsDTO[] { i };
    return wonderousArray;
  }

  public static WondrousItemsDTO[] toWondrousItemsArrayIIDTO(
    WondrousItems[] items
  ) {
    WondrousItemsDTO iI = MapperItemsDTO.toWondrousItemsDTO(items[0]);
    WondrousItemsDTO iII = MapperItemsDTO.toWondrousItemsDTO(items[1]);
    WondrousItemsDTO[] wonderousArray = new WondrousItemsDTO[] { iI, iII };
    return wonderousArray;
  }

  public static InventoryDTO toInventoryDTO(Inventory inventory) {
    return new InventoryDTO(inventory);
  }

  public static ArrayList<WeaponsDTO> toArrayWeaponsDTOList(
    ArrayList<Weapons> weaponList
  ) {
    ArrayList<WeaponsDTO> weaponDTOList = new ArrayList<WeaponsDTO>();
    if (weaponList.size() == 0) {
      return weaponDTOList;
    } else {
      weaponList.forEach(weapon -> {
        WeaponsDTO weaponDTO = MapperItemsDTO.toWeaponDTO(weapon);
        weaponDTOList.add(weaponDTO);
      });
    }

    return weaponDTOList;
  }

  public static ArrayList<WondrousItemsDTO> toArrayWonderousItemsDTOList(
    ArrayList<WondrousItems> wonderousItemsList
  ) {
    ArrayList<WondrousItemsDTO> wonderousItemsListDTO = new ArrayList<WondrousItemsDTO>();
    if (wonderousItemsList.size() == 0) {
      return wonderousItemsListDTO;
    }

    wonderousItemsList.forEach(item -> {
      WondrousItemsDTO itemDTO = new WondrousItemsDTO(item);
      wonderousItemsListDTO.add(itemDTO);
    });

    return wonderousItemsListDTO;
  }

  public static HashMap<String, WondrousItemsDTO[]> toBodyMapDTO(
    HashMap<String, WondrousItems[]> body
  ) {
    HashMap<String, WondrousItemsDTO[]> bodyDTO = new HashMap<String, WondrousItemsDTO[]>();
    if (body.size() == 0) {
      WondrousItemsDTO[] itemList = { null };
      bodyDTO.put("head", itemList);
      bodyDTO.put("arms", itemList);
      WondrousItemsDTO[] itemListII = { null, null };
      bodyDTO.put("hands", itemListII);
      bodyDTO.put("neck", itemList);
      bodyDTO.put("cloth", itemList);
      bodyDTO.put("legs", itemList);
    } else {
      WondrousItemsDTO[] itemList = MapperItemsDTO.toWondrousItemsArrayDTO(
        body.get("head")
      );
      bodyDTO.put("head", itemList);
      itemList = MapperItemsDTO.toWondrousItemsArrayDTO(body.get("arms"));
      bodyDTO.put("arms", itemList);
      WondrousItemsDTO[] itemListII = MapperItemsDTO.toWondrousItemsArrayIIDTO(
        body.get("hands")
      );
      bodyDTO.put("hands", itemListII);
      itemList = MapperItemsDTO.toWondrousItemsArrayDTO(body.get("neck"));
      bodyDTO.put("neck", itemList);
      itemList = MapperItemsDTO.toWondrousItemsArrayDTO(body.get("cloth"));
      bodyDTO.put("cloth", itemList);
      itemList = MapperItemsDTO.toWondrousItemsArrayDTO(body.get("legs"));
      bodyDTO.put("legs", itemList);
    }
    return bodyDTO;
  }
}
