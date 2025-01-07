import { CharacterPc, Inventory } from "../../interfaces";
import { reSizeWeapon, reWeightItem } from "../../Size/function";
import { noneArmor, noneShield, noneWeapon } from "../../variables";
import { reMaterialArmType, reMaterialFailure, reMaterialMaxDex, reMaterialPenality, reMaterialWeight } from "../Material/function";

export const modifyInventory = (char: CharacterPc): Inventory => {
  const inventory: Inventory = char.inventory;

  return {
    ...inventory,
    armor: inventory.armor ? {
      ...inventory.armor,
      armorType: reMaterialArmType(
        inventory.armor.material,
        inventory.armor.armorType
      ),
      weight: reMaterialWeight(
        inventory.armor.material,
        reWeightItem(char.race.size.id, inventory.armor.weight)
      ),
      penality: reMaterialPenality(inventory.armor.material, inventory.armor.penality, inventory.armor.enchantment ? true : false),
      maxDex: reMaterialMaxDex(inventory.armor.material, inventory.armor.maxDex),
      failure: reMaterialFailure(inventory.armor.material, inventory.armor.failure)
    }  : noneArmor,
    shield: inventory.shield ? {
      ...inventory.shield,
      weight: reMaterialWeight(
        inventory.armor.material,
        reWeightItem(char.race.size.id, inventory.shield.weight)
      ),
      penality: reMaterialPenality(inventory.shield.material, inventory.shield.penality, inventory.shield.enchantment ? true : false)
    } : noneShield,
    weaponOne: inventory.weaponOne ? {
      ...reSizeWeapon(char.race.size, inventory.weaponOne),
      weight: reWeightItem(char.race.size.id, inventory.weaponOne.weight)
    } : noneWeapon,
    weaponTwo: inventory.weaponTwo ? {
      ...reSizeWeapon(char.race.size, inventory.weaponTwo),
      weight: reWeightItem(char.race.size.id, inventory.weaponTwo.weight)
    }  : noneWeapon,
    weaponThree: inventory.weaponThree ? {
      ...reSizeWeapon(char.race.size, inventory.weaponThree),
      weight: reWeightItem(char.race.size.id, inventory.weaponThree.weight)
    } : noneWeapon,
    weaponFour: inventory.weaponFour ? {
      ...reSizeWeapon(char.race.size, inventory.weaponFour),
      weight: reWeightItem(char.race.size.id, inventory.weaponFour.weight)
    } : noneWeapon,
    weaponFive: inventory.weaponFive ? {
      ...reSizeWeapon(char.race.size, inventory.weaponFive) ,
      weight: reWeightItem(char.race.size.id, inventory.weaponFive.weight)
    } : noneWeapon
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
