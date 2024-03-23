package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.entity.Items;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class MapperItems {

    public static Armors toArmor(ArmorsDTO armorDTO) {

        Armors armor = new Armors(armorDTO);

        return armor;
    }

    public static Shields toShield(ShieldsDTO shieldDTO) {
        Shields shield = new Shields(shieldDTO);

        return shield;
    }

    public static Weapons toWeapon(WeaponsDTO weaponDTO) {
        Weapons weapon = new Weapons(weaponDTO);

        return weapon;
    }

    public static WondrousItems toWondrousItems(WondrousItemsDTO itemDTO) {
        WondrousItems item = new WondrousItems(itemDTO);

        return item;
    }

    public static List<WondrousItems> toListItems(ArrayList<WondrousItemsDTO> list, List<Items> listOfAllItems) {
        ArrayList<WondrousItems> itemsList = new ArrayList<WondrousItems>();

        if (list.size() > 0) {
            for (WondrousItemsDTO item : list) {
                for (Items allItem : listOfAllItems) {
                    if (item.id == allItem.getId()) {
                        itemsList.add((WondrousItems) allItem);
                        break;
                    }
                }
            }
        }
        return itemsList;
    }

}
