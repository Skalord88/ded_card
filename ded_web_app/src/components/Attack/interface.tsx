import { Weapon } from "../interfaces";

export type MeleeRangeTwo = {
    melee?: number[];
    range?: number[];
    meleeTwo?: number[];
    rangeTwo?: number[];
}

export type WeaponAttack = {
    weapon: Weapon;
    pose: number;
    meleeRangeTwo: MeleeRangeTwo;
}