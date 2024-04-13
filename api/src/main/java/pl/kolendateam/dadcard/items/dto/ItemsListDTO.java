package pl.kolendateam.dadcard.items.dto;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.items.MapperItemsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class ItemsListDTO {

  public ArrayList<ArmorsDTO> armorsList;
  public ArrayList<ShieldsDTO> shieldList;
  public ArrayList<WeaponsDTO> weaponsList;
  public ArrayList<WondrousItemsDTO> wonderousItems;

  public void setListOfArmors(ArrayList<ArmorsDTO> armorDTOList) {
    this.armorsList = armorDTOList;
  }

  public void setListOfShields(ArrayList<ShieldsDTO> shieldsDTOList) {
    this.shieldList = shieldsDTOList;
  }

  public void setListOfWeapons(ArrayList<WeaponsDTO> weaponsDTOList) {
    this.weaponsList = weaponsDTOList;
  }

  public void setListOfWonderousItem(
      ArrayList<WondrousItemsDTO> wonderousItemsDTOList) {
    this.wonderousItems = wonderousItemsDTOList;
  }

  public ItemsListDTO createListOfItemsDTO(List<Items> itemsList, ItemsListDTO itemsDTOList) {

    ArrayList<ArmorsDTO> armorDTOList = new ArrayList<>();
    ArrayList<ShieldsDTO> shieldsDTOList = new ArrayList<>();
    ArrayList<WeaponsDTO> weaponsDTOList = new ArrayList<>();
    ArrayList<WondrousItemsDTO> wonderousItemsDTOList = new ArrayList<>();

    itemsList.forEach(item -> {
      if (item instanceof Armors) {
        armorDTOList.add(MapperItemsDTO.toArmorDTO((Armors) item));
      } else if (item instanceof Shields) {
        shieldsDTOList.add(MapperItemsDTO.toShieldDTO((Shields) item));
      } else if (item instanceof Weapons) {
        weaponsDTOList.add(MapperItemsDTO.toWeaponDTO((Weapons) item));
      } else if (item instanceof WondrousItems) {
        wonderousItemsDTOList.add(
            MapperItemsDTO.toWondrousItemsDTO((WondrousItems) item));
      }
    });

    itemsDTOList.setListOfArmors(armorDTOList);
    itemsDTOList.setListOfShields(shieldsDTOList);
    itemsDTOList.setListOfWeapons(weaponsDTOList);
    itemsDTOList.setListOfWonderousItem(wonderousItemsDTOList);

    return itemsDTOList;
  }

}
