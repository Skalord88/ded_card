import { ModifierBonus } from "../../interfaces"
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum"

export type DamageBonus = {
    modifierBonus?: ModifierEnum,
    target?: string[],
    type?: ModifierBonus[],
    bonus: Number
}