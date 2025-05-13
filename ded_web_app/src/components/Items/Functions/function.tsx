import { ItemToSend } from "../../../pages/Items";
import { ClassFeats, Feat, FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  Armor,
  InventoryOfItemsToSend,
  Item,
  ItemsList,
  Shield,
  Weapon,
  WonderousItem
} from "../../interfaces";

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
  };
};

export const createItemsInInventory = (
  i: Weapon | Item | WonderousItem | Armor | Shield
): ItemToSend => {
  return {
      id: i.id ?? 0,
      itemId:
        "itemId" in i
          ? i.id === i.itemId ? i.id ?? undefined : i.itemId ?? undefined : undefined,
          // ? i.id ?? undefined : undefined,
          material:
        "itemId" in i ? (typeof i.material === "string" && ["LEATHER", "WOOD", "METAL"].includes(i.material)) ? undefined : i.material : undefined,
      enchantment:
        "itemId" in i
          ? i.enchantment?.flatMap((en) =>
              en.id ? { id: en.id } : []
            )
          : undefined,
      enchantmentBonus:
        "itemId" in i ? i.enchantmentBonus : undefined
    }
};

export const sendItemsInInventory = (
  inventory: (
    | Weapon
    | Item
    | WonderousItem
    | WonderousItem[]
    | Armor
    | Shield
  )[]
): InventoryOfItemsToSend => {
  return {
    backpack: (inventory[7] as WonderousItem[]).map((i) =>
      createItemsInInventory(i)
    ),
    inventory: [
      createItemsInInventory(inventory[0] as Armor),
      createItemsInInventory(inventory[1] as Shield),
      createItemsInInventory(inventory[2] as Weapon),
      createItemsInInventory(inventory[3] as Weapon),
      createItemsInInventory(inventory[4] as Weapon),
      createItemsInInventory(inventory[5] as Weapon),
      createItemsInInventory(inventory[6] as Weapon),
      createItemsInInventory(inventory[8] as WonderousItem),
      createItemsInInventory(inventory[9] as WonderousItem),
      createItemsInInventory(inventory[10] as WonderousItem),
      createItemsInInventory(inventory[11] as WonderousItem),
      createItemsInInventory(inventory[12] as WonderousItem),
      createItemsInInventory(inventory[13] as WonderousItem),
      createItemsInInventory(inventory[14] as WonderousItem),
      createItemsInInventory(inventory[15] as WonderousItem)
    ]
  };
};

export const charTresurePerLevel = (lv: number): number => {
  switch (lv) {
    case 2:
      return 900;
    case 3:
      return 2700;
    case 4:
      return 5400;
    case 5:
      return 9000;
    case 6:
      return 13000;
    case 7:
      return 19000;
    case 8:
      return 27000;
    case 9:
      return 36000;
    case 10:
      return 49000;
    case 11:
      return 66000;
    case 12:
      return 88000;
    case 13:
      return 110000;
    case 14:
      return 150000;
    case 15:
      return 200000;
    case 16:
      return 260000;
    case 17:
      return 340000;
    case 18:
      return 440000;
    case 19:
      return 580000;
    case 20:
      return 760000;
    default:
      return 0;
  }
};
