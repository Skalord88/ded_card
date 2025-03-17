import { all } from "axios";
import { ClassFeats, Feat, FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  Armor,
  Enchantment,
  Item,
  ItemsList,
  ItemToSend,
  Shield,
  Weapon,
  WonderousItem
} from "../../interfaces";

// export function isArmor(item: Armor | Shield | Weapon): item is Armor {
//   return (item as Armor) !== undefined;
// }
// export function isShield(item: Armor | Shield | Weapon): item is Shield {
//   return (item as Shield) !== undefined;
// }
// export function isWeapon(item: Armor | Shield | Weapon): item is Weapon {
//   return (item as Weapon) !== undefined;
// }

export function FilterNoItem(list: WonderousItem[]): WonderousItem[] {
  return list.filter((item) => item.id !== 4);
}

export function ReturnRingPosition(type: string, position: number): string {
  let res: string;

  type === "hands" ? (res = type + position) : (res = type);

  return res;
}

export function ChangeCritWithFeat(weapon: Weapon, two: boolean): Weapon {
  return {
    ...weapon,
    critical: two ? ModifyCrit(weapon.critical) : weapon.critical
  };
}

export function ModifyCrit(crit: string): string {
  switch (crit) {
    case "X2":
      return "X2_1920";
    case "X2_1920":
      return "X2_1820";
    case "X2_1820":
      return "X2_1620";
    case "X3":
      return "X3_1920";
    case "X4":
      return "X4_1920";
    case "X3X4":
      return "X3X4_1920";
    default:
      return "X2";
  }
}

export const findAllProficency = (
  allFeats: {
    feats: Feat[];
    classFeats: ClassFeats[];
    pcFeats: {
      fromLevel: FeatPc[];
      fromClass: FeatPc[];
    };
  },
  items: ItemsList
): { type: string[]; specific: Item[] } => {
  let findAllTypes: string[] = Array.from(
    new Set([
      ...allFeats.feats.flatMap((feat) => feat.selected?.weaponType || []),
      ...allFeats.classFeats.flatMap((feat) => feat.selected?.weaponType || []),
      ...allFeats.pcFeats.fromLevel.flatMap(
        (feat) => feat.selected?.weaponType || []
      ),
      ...allFeats.pcFeats.fromClass.flatMap(
        (feat) => feat.selected?.weaponType || []
      )
    ])
  );
  let findAllItems: Item[] = Array.from(
    new Set([
      ...items.weaponsList.filter((w) =>
        w.type.some((type) => findAllTypes.includes(type))
      )
    ])
  );

  return {
    type: findAllTypes,
    specific: findAllItems
    // Array.from(new Set(findAllItems))
  };
};

// export type inventoryToSend = {
//   ItemToSend[]
// };

export const createWeaponItemsInInventory = (
  weapons: Weapon[]
): ItemToSend[] => {
  return weapons.map(w => ({
    id: null,
    itemId: w.itemId || 0 ,
    material: w.material || "",
    enchantmentBonus: w.enchantmentBonus || 0
  }))
}

export const sendItemsInInventory = (
  inventory: (Weapon | Item | WonderousItem | Armor | Shield)[]
): ItemToSend[] => {
  const armor: ItemToSend = inventory[0] && "armorName" in inventory[0]?
   {
    id: null, // Provide a default non-null value for id
    itemId: inventory[0].itemId || 0 , // Ensure item.id is never null
    material: inventory[0].material? inventory[0].material : null,
    enchantmentBonus: inventory[0].enchantmentBonus || 0, // Provide default values if necessary
    // enchantment
  }
   : {id: 2}
  const shield: ItemToSend = inventory[1] && "shieldName" in inventory[1]?
   {
    id: null, // Provide a default non-null value for id
    itemId: inventory[1].itemId || 0 , // Ensure item.id is never null
    material: inventory[1].material || "", // Provide default values if necessary
    enchantmentBonus: inventory[1].enchantmentBonus || 0, // Provide default values if necessary
    // enchantment
  }
   : {id: 3}
  const weapons: ItemToSend[] = createWeaponItemsInInventory([
    inventory[2] as Weapon, inventory[3] as Weapon,
    inventory[4] as Weapon, inventory[5] as Weapon,
    inventory[6] as Weapon
  ]
  )
  return [armor, shield, weapons[0], weapons[1], weapons[2], weapons[3], weapons[4]];
}
