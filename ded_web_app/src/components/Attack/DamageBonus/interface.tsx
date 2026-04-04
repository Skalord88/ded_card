import { ModifierBonus } from "../../interfaces"
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum"

export type DamageBonus = {
    modifierBonus?: ModifierEnum,
    target?: ModifierEnum[],
    type?: ModifierBonus[],
    bonus: Number
}