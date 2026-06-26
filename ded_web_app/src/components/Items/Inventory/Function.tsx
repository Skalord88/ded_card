import { FiltroItems } from "../../../pages/Items";
import {
    costOfEnchant,
    costOfMaterial
} from "../../Enchantment/Functions/EnchantmentFunctions";
import { ItemInDrop } from "../../functions";
import {
    Armor,
    Inventory,
    Item,
    Shield,
    Weapon,
    WonderousItem
} from "../../interfaces";
import { reSizeWeapon, reWeightItem } from "../../Size/function";
import { emptyInventory, noneArmor, noneItem, noneShield, noneWeapon } from "../../variables";
import {
    reMaterialArmType,
    reMaterialFailure,
    reMaterialMaxDex,
    reMaterialPerfectPenality,
    reMaterialWeight
} from "../Material/function";

export const notEmptyInventory = (inventory: Inventory) => {
  if(!inventory) return emptyInventory;
  return {
    ...inventory,
    armor: inventory.armor ? inventory.armor : noneArmor,
    shield: inventory.shield ? inventory.shield : noneShield,
    weaponOne: inventory.weaponOne ? inventory.weaponOne : noneWeapon,
    weaponTwo: inventory.weaponTwo ? inventory.weaponTwo : noneWeapon,
    weaponThree: inventory.weaponThree ? inventory.weaponThree : noneWeapon,
    weaponFour: inventory.weaponFour ? inventory.weaponFour : noneWeapon,
    weaponFive: inventory.weaponFive ? inventory.weaponFive : noneWeapon,
    backpack:
      Array.isArray(inventory.backpack) && inventory.backpack.length > 0
        ? inventory.backpack
        : [noneItem],
    head: inventory.head != null ? inventory.head : noneItem,
    neck: inventory.neck != null ? inventory.neck : noneItem,
    arms: inventory.arms != null ? inventory.arms : noneItem,
    ringOne: inventory.ringOne != null ? inventory.ringOne : noneItem,
    ringTwo: inventory.ringTwo != null ? inventory.ringTwo : noneItem,
    cloth: inventory.cloth != null ? inventory.cloth : noneItem,
    cloak: inventory.cloak != null ? inventory.cloak : noneItem,
    belt: inventory.belt != null ? inventory.belt : noneItem,
    legs: inventory.legs != null ? inventory.legs : noneItem
  };
};

export const modifyInventory = (
  charSizeId: number,
  inventory: Inventory
): Inventory => {
  // const inventory: Inventory = inv;

  if (!inventory) return emptyInventory;
  return {
    ...inventory,
    armor: inventory.armor
      ? {
          ...inventory.armor,
          armorType: reMaterialArmType(
            inventory.armor.material ?? "",
            inventory.armor.armorType
          ),
          weight: reMaterialWeight(
            inventory.armor.material ?? null,
            reWeightItem(charSizeId, inventory.armor.weight)
          ),
          penality: reMaterialPerfectPenality(
            inventory.armor.material ?? null,
            inventory.armor.penality,
            inventory.armor.enchantment ? true : false
          ),
          maxDex: reMaterialMaxDex(
            inventory.armor.material ?? null,
            inventory.armor.maxDex
          ),
          failure: reMaterialFailure(
            inventory.armor.material ?? null,
            inventory.armor.failure
          )
        }
      : noneArmor,
    shield: inventory.shield
      ? {
          ...inventory.shield,
          weight: reMaterialWeight(
            inventory.shield.material ?? null,
            reWeightItem(charSizeId, inventory.shield.weight)
          ),
          penality: reMaterialPerfectPenality(
            inventory.shield.material ?? null,
            inventory.shield.penality,
            inventory.shield.enchantment ? true : false
          )
        }
      : noneShield,
    weaponOne: inventory.weaponOne
      ? {
          ...reSizeWeapon(charSizeId, inventory.weaponOne),
          weight: reWeightItem(charSizeId, inventory.weaponOne.weight)
        }
      : noneWeapon,
    weaponTwo: inventory.weaponTwo
      ? {
          ...reSizeWeapon(charSizeId, inventory.weaponTwo),
          weight: reWeightItem(charSizeId, inventory.weaponTwo.weight)
        }
      : noneWeapon,
    weaponThree: inventory.weaponThree
      ? {
          ...reSizeWeapon(charSizeId, inventory.weaponThree),
          weight: reWeightItem(charSizeId, inventory.weaponThree.weight)
        }
      : noneWeapon,
    weaponFour: inventory.weaponFour
      ? {
          ...reSizeWeapon(charSizeId, inventory.weaponFour),
          weight: reWeightItem(charSizeId, inventory.weaponFour.weight)
        }
      : noneWeapon,
    weaponFive: inventory.weaponFive
      ? {
          ...reSizeWeapon(charSizeId, inventory.weaponFive),
          weight: reWeightItem(charSizeId, inventory.weaponFive.weight)
        }
      : noneWeapon,
    backpack:
      Array.isArray(inventory.backpack) && inventory.backpack.length > 0
        ? inventory.backpack
        : [noneItem],
    head: inventory.head != null ? inventory.head : noneItem,
    neck: inventory.neck != null ? inventory.neck : noneItem,
    arms: inventory.arms != null ? inventory.arms : noneItem,
    ringOne: inventory.ringOne != null ? inventory.ringOne : noneItem,
    ringTwo: inventory.ringTwo != null ? inventory.ringTwo : noneItem,
    cloth: inventory.cloth != null ? inventory.cloth : noneItem,
    cloak: inventory.cloak != null ? inventory.cloak : noneItem,
    belt: inventory.belt != null ? inventory.belt : noneItem,
    legs: inventory.legs != null ? inventory.legs : noneItem
  };
};

export function calculateInventoryWeight(inventory: Inventory): number {
  return parseFloat(
    (
      inventory.armor.weight +
      inventory.shield.weight +
      inventory.weaponOne.weight +
      inventory.weaponTwo.weight +
      inventory.weaponThree.weight +
      inventory.weaponFour.weight +
      inventory.weaponFive.weight
    ).toFixed(2)
  );
}

export function calculateWeight(
  strenght: number,
  size: number,
  inventoryWeight: number
): [string, number] {
  let w: number[] = [0, 0, 0];

  switch (strenght) {
    case 1:
      w = [4, 6, 10];
      break;
    case 2:
      w = [7, 13, 20];
      break;
    case 3:
      w = [11, 20, 30];
      break;
    case 4:
      w = [14, 26, 40];
      break;
    case 5:
      w = [17, 33, 50];
      break;
    case 6:
      w = [21, 40, 60];
      break;
    case 7:
      w = [24, 46, 70];
      break;
    case 8:
      w = [27, 53, 80];
      break;
    case 9:
      w = [31, 60, 90];
      break;
    case 10:
      w = [34, 66, 100];
      break;
    case 11:
      w = [39, 76, 115];
      break;
    case 12:
      w = [44, 86, 130];
      break;
    case 13:
      w = [51, 100, 150];
      break;
    case 14:
      w = [59, 116, 175];
      break;
    case 15:
      w = [67, 133, 200];
      break;
    case 16:
      w = [77, 153, 230];
      break;
    case 17:
      w = [87, 173, 260];
      break;
    case 18:
      w = [101, 200, 300];
      break;
    case 19:
      w = [117, 233, 350];
      break;
    case 20:
      w = [134, 266, 400];
      break;
    case 21:
      w = [154, 306, 460];
      break;
    case 22:
      w = [174, 346, 520];
      break;
    case 23:
      w = [201, 400, 600];
      break;
    case 24:
      w = [234, 466, 700];
      break;
    case 25:
      w = [267, 533, 800];
      break;
    case 26:
      w = [307, 613, 920];
      break;
    case 27:
      w = [347, 693, 1040];
      break;
    case 28:
      w = [401, 800, 1200];
      break;
    case 29:
      w = [467, 933, 1400];
      break;
    default:
      w = [0, 0, 0];
      break;
  }

  switch (size) {
    case 1:
      w = w.map((x) => x / 8);
      break;
    case 2:
      w = w.map((x) => x / 4);
      break;
    case 3:
      w = w.map((x) => x / 2);
      break;
    case 4:
      w = w.map((x) => (x * 3) / 4);
      break;
    case 6:
      w = w.map((x) => x * 2);
      break;
    case 7:
      w = w.map((x) => x * 4);
      break;
    case 8:
      w = w.map((x) => x * 8);
      break;
    case 9:
      w = w.map((x) => x * 12);
      break;
  }

  if (inventoryWeight < w[0]) return ["light load", inventoryWeight];
  if (inventoryWeight < w[1]) return ["medium load", inventoryWeight];
  if (inventoryWeight < w[2]) return ["heavy load", inventoryWeight];
  return ["over load", inventoryWeight];
}

export const calculateCost = (
  title: string,
  costItem: number,
  enchantment: number[],
  enchantmentBonusItem: number,
  materialItem: string,
  weightItem: number,
  typeItem: string
): number => {
  let cost = costItem;

  const highEnchant: number =
    enchantment.length > 0
      ? enchantment.reduce((tot, en) => tot + (en > 6 ? en : 0), 0)
      : 0;
  const lowEnchant: number =
    enchantment.length > 0
      ? enchantment.reduce((tot, en) => tot + (en < 6 ? en : 0), 0)
      : 0;
  const totEnchant: number = enchantmentBonusItem + lowEnchant;

  if (title === "Armor") {
    return (cost =
      cost +
      highEnchant +
      costOfEnchant(totEnchant, title) +
      costOfMaterial(materialItem, typeItem, weightItem));
  }

  if (title === "Weapon") {
    return (cost =
      cost +
      highEnchant +
      costOfEnchant(totEnchant, title) +
      costOfMaterial(materialItem, typeItem, weightItem));
  }

  return cost;
};

export const specificFilter = (
  itemIndex: number,
  filter: FiltroItems
): ItemInDrop[] => {
  if (!filter) return [];

  const indexMap: Record<number, string> = {
    7: "HELMET",
    8: "AMULET",
    9: "BRACERS",
    10: "RING",
    11: "RING",
    12: "CLOTH",
    13: "CLOAK",
    14: "BELT",
    15: "BOOTS"
  };

  if (itemIndex === 0) return filter.armors;
  if (itemIndex === 1) return filter.shields;
  if ([2, 3, 4, 5, 6].includes(itemIndex)) return filter.weapons;

  const itemType = indexMap[itemIndex];
  if (itemType && filter.wonderous) {
    return filter.wonderous.filter(
      (item) => (item.item as WonderousItem).wondrousType === itemType
    );
  }

  return [];
};

export const droppItemsToNonItem = (
  exItem: Item | Armor | Shield | Weapon | WonderousItem
): Item | Armor | Shield | Weapon | WonderousItem => {
  return exItem && "armorName" in exItem
    ? noneArmor
    : exItem && "shieldName" in exItem
    ? noneShield
    : exItem && "weaponName" in exItem
    ? noneWeapon
    : noneItem;
};
