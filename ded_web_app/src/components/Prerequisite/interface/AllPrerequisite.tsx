import { ModifierEnum } from "./ModifierEnum"

export type AllPrerequisiteMap = {
    [type: string]: {target: [ModifierEnum] | null, bonus: number}[] | null
}