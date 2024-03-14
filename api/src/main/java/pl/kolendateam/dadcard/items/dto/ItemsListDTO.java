package pl.kolendateam.dadcard.items.dto;

import java.util.ArrayList;
import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;

public class ItemsListDTO {

  public ArrayList<ArmorsDTO> armorsList;
  public ArrayList<WeaponsDTO> weaponsList;
  public ArrayList<WondrousItemsDTO> wonderousItems;

  public void setListOfArmors(ArrayList<ArmorsDTO> armorDTOList) {
    this.armorsList = armorDTOList;
  }

  public void setListOfWeapons(ArrayList<WeaponsDTO> weaponsDTOList) {
    this.weaponsList = weaponsDTOList;
  }

  public void setListOfWonderousItem(
    ArrayList<WondrousItemsDTO> wonderousItemsDTOList
  ) {
    this.wonderousItems = wonderousItemsDTOList;
  }
}
