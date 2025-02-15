import { all } from "axios";
import { ClassFeats, Feat, FeatPc } from "../../Feats/Interface/FeatInterface";
import { Item, ItemsList, Weapon, WonderousItem } from "../../interfaces";

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

export const findAllProficency = (allFeats: {
  feats: Feat[];
  classFeats: ClassFeats[];
  pcFeats: {
    fromLevel: FeatPc[];
    fromClass: FeatPc[];
  };
}, items: ItemsList): { type: string[]; specific: Item[] } => {
  let findAllTypes: string[] = Array.from(new Set([
    ...allFeats.feats.flatMap((feat) => feat.selected?.weaponType || []),
    ...allFeats.classFeats.flatMap((feat) => feat.selected?.weaponType || []),
    ...allFeats.pcFeats.fromLevel.flatMap((feat) => feat.selected?.weaponType || []),
    ...allFeats.pcFeats.fromClass.flatMap((feat) => feat.selected?.weaponType || [])
]));
  let findAllItems: Item[] = Array.from(new Set([
    ...items.weaponsList.filter(w => w.type.some(type => findAllTypes.includes(type)))
  ]))
  
  return {
    type: findAllTypes,
    specific: findAllItems 
    // Array.from(new Set(findAllItems))
  };
};
