import { ModifierBonus } from "../../interfaces"
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum"

export type AttackRoll = {
    modifierBonus?: ModifierEnum,
    target?: string[],
    improved?: Boolean,
    type?: ModifierBonus[],
    bonus: Number
}