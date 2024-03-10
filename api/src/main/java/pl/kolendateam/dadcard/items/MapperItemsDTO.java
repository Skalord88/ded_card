package pl.kolendateam.dadcard.items;

import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WonderousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class MapperItemsDTO {

  // public static List<WonderousItemsDTO> toWondrousItemsDTO(
  //   List<WondrousItems> items
  // ) {
  //   ArrayList<WonderousItemsDTO> itemsDTOList = new ArrayList<>();
  //   items.forEach(item -> {
  //     WonderousItemsDTO iDTO = new WonderousItemsDTO(item);
  //     itemsDTOList.add(iDTO);
  //   });

  //   return itemsDTOList;
  // }

  // public static List<ArmorsDTO> toArmorsDTO(List<Armors> items) {
  //   ArrayList<ArmorsDTO> armorsDTOList = new ArrayList<>();
  //   items.forEach(item -> {
  //     ArmorsDTO iDTO = new ArmorsDTO(item);
  //     armorsDTOList.add(iDTO);
  //   });

  //   return armorsDTOList;
  // }

  // public static List<WeaponsDTO> toWeaponsDTO(List<Weapons> weapons) {
  //   ArrayList<WeaponsDTO> weaponsDTOList = new ArrayList<>();
  //   for (Weapons w : weapons) {
  //     WeaponsDTO wDTO = new WeaponsDTO(w);
  //     weaponsDTOList.add(wDTO);
  //   }

  //   return weaponsDTOList;
  // }

  public static ArmorsDTO toArmorDTO(Armors item) {
    return new ArmorsDTO(item);
  }

  public static WeaponsDTO toWeaponDTO(Weapons item) {
    return new WeaponsDTO(item);
  }

  public static WonderousItemsDTO toWondrousItemsDTO(WondrousItems item) {
    return new WonderousItemsDTO(item);
  }
}
