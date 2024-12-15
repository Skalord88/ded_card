import { Prerequisite } from "../Prerequisite/interface/Prerequisite"


export type Size = {
    id: number,
    size: string,
    modifiers: Prerequisite | null
}