import { ModifierBonus } from "../../interfaces"

export type AttackRoll = {
    modifierBonus: ModifierBonus,
    target?: string[],
    improved?: Boolean,
    type?: ModifierBonus[],
    bonus: Number
}