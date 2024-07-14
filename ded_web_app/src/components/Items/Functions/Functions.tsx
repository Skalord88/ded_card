import { WonderousItem } from "../../interfaces";

export function FilterNoItem(list: WonderousItem[]): WonderousItem[] {
  return list.filter((item) => item.id !== 4);
}

export function ReturnRingPosition(type: string, position: number): string {
  let res: string;

  type === "hands" ? (res = type + position) : (res = type);

  return res;
}
