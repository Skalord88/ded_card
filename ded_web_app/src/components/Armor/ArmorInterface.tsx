import { Inventory } from "../interfaces"

export type ArmorList =
    {sign: string, bonus: number, text: string, item: string}[]

export type ArmorModifiers = {
    size: number,
    armor: number,
    shiled: number,
    dextrity: number,
    natural: number,
    dodge: number,
    deflection: number
}

export type InventoryProps = {
    inventory: Inventory
}
