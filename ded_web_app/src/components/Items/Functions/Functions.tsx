import { WonderousItem } from "../../interfaces";

export function FilterNoItem(
    list: WonderousItem[]
  ): WonderousItem[] {
    return list.filter(item => item.id !== 4)
  }