import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";

// export type SavingThrowFRW = {
//     fortitude: Number;
//     reflex: Number;
//     will: Number;
// }

export type SavingThrow = {
    fortitude: Number;
    reflex: Number;
    will: Number;
    resistance: Resistance[];
    modifierBonus?: ModifierEnum,
}

export type Resistance = {
    type: string;
    target: string[];
    bonus: Number;
}