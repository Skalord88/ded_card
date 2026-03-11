import { ModifierBonus } from "../interfaces";

export type SavingThrow = {
    fortitude: Number;
    reflex: Number;
    will: Number;
    resistance: Resistance[];
    modifierBonus: ModifierBonus,
}

export type Resistance = {
    type: string;
    target: string[];
    bonus: Number;
}