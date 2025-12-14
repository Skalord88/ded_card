import { Feat } from "../Feats/Interface/FeatInterface"
import { Prerequisite } from "../Prerequisite/interface/Prerequisite"
import { Region } from "../Region/interface"
import { Size } from "../Size/interfaces"


export type Race = {
    id: number,
    raceName: string,
    avatarRaceUrl: string,
    modifiers: Prerequisite | null,
    raceFeats: Feat[]
}

export type SpecialAbilities = {
    specialType: number,
    name: string,
    type: string,
    description?: string,
    dc: number,
    dcAbility: string[],
    value?: number,
    valueText?: string,
    damageDice?: string,
    damageNumberDice?: number,
    maxValue: number,
    prerequisiteHd: number,
    target: string,
    area: string
}

export type SubRace = {
    id: number,
    subRacesName: string;
    race: Race;
    size: Size;
    avatarUrl: string;
    modifiers: Prerequisite | null,
    subRaceFeats: Feat[],
    availableRegions: Region[]
    levelAdjustment: number;
    specialAbilities: SpecialAbilities[]
}
export type Archetype = {
    id: number,
    archetypeName: string;
    modifiers: Prerequisite | null,
    archetypeFeats: Feat[],
    levelAdjustment: number;
    specialAbilities: SpecialAbilities[]
}