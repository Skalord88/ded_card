import { ModifierEnum } from "./ModifierEnum"

export type AllPrerequisite = {
    [type: string]: {target: [ModifierEnum] | null, bonus: number}[] | null
}