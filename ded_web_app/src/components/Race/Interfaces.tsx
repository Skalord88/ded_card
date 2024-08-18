import { Abilitys } from "../interfaces"
import { Size } from "../Size/Interfaces"

export type Race = {
    id: number,
    subRacesName: string,
    raceAbilitys: Abilitys | null,
    raceSkills: null,
    armorClass: null,
    levelAdjustment: number,
    size: Size
}