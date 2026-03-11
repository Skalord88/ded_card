import { ModifierBonus } from "../../interfaces"

export type DamageBonus = {
    modifierBonus?: ModifierBonus,
    target?: string[],
    type?: ModifierBonus[],
    bonus: Number
}