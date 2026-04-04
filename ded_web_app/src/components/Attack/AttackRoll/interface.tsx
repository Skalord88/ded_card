import { Item, ModifierBonus } from "../../interfaces"
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum"

export type AttackRoll = {
    modifierBonus?: ModifierEnum,
    target?: ModifierEnum[],
    improved?: Boolean,
    type?: ModifierEnum[],
    bonus: Number
}