import { Weapon, WonderousItem } from "../../interfaces";

export function FilterNoItem(list: WonderousItem[]): WonderousItem[] {
  return list.filter((item) => item.id !== 4);
}

export function ReturnRingPosition(type: string, position: number): string {
  let res: string;

  type === "hands" ? (res = type + position) : (res = type);

  return res;
}

export function ChangeCritWithFeat(weapon: Weapon, two: boolean): Weapon {
  return {...weapon,
    critical: two? ModifyCrit(weapon.critical) : weapon.critical
  }
}

export function ModifyCrit(crit: string): string {
  switch(crit){
    case 'X2': return 'X2_1920'
    case 'X2_1920': return 'X2_1820'
    case 'X2_1820': return 'X2_1620'
    case 'X3': return 'X3_1920'
    case 'X4': return 'X4_1920'
    case 'X3X4': return 'X3X4_1920'
    default: return 'X2'
  }
}
