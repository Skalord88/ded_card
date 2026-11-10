import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum"

export type AttackRoll = {
    modifierType?: ModifierEnum,
    target?: ModifierEnum[],
    improved?: Boolean,
    type?: ModifierEnum[],
    bonus: Number
}