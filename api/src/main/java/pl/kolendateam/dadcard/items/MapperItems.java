package pl.kolendateam.dadcard.items;

import java.util.ArrayList;
import java.util.List;

import pl.kolendateam.dadcard.items.armor.dto.ArmorsDTO;
import pl.kolendateam.dadcard.items.armor.dto.ShieldsDTO;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.weapons.dto.WeaponsDTO;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.dto.WondrousItemsDTO;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

public class MapperItems {

    public static Armors toArmor(ArmorsDTO armorDTO) {
        Armors armor = new Armors();

        armor.setId(armorDTO.id);

        return armor;
    }

    public static Shields toShield(ShieldsDTO shieldDTO) {
        Shields shield = new Shields();

        shield.setId(shieldDTO.id);

        return shield;
    }

    public static Weapons toWeapon(WeaponsDTO weaponDTO) {
        Weapons weapon = new Weapons();

        weapon.setId(weaponDTO.id);

        return weapon;
    }

    public static WondrousItems toWondrousItems(WondrousItemsDTO itemDTO) {
        WondrousItems item = new WondrousItems();

        item.setId(itemDTO.id);

        return item;
    }

    public static List<WondrousItems> toListItems(ArrayList<WondrousItemsDTO> list) {
        ArrayList<WondrousItems> itemsList = new ArrayList<WondrousItems>();

        list.forEach(item -> {
            itemsList.add(new WondrousItems(item.id));
        });

        return itemsList;
    }

}
