import { Size } from "../Size/Interfaces"
import { Feat } from "../Feats/Interface/FeatInterface"
import { Prerequisite } from "../Prerequisite/interface/Prerequisite"


export type Race = {
    id: number,
    raceName: string,
    avatarRaceUrl: string,
    modifiers: Prerequisite | null,
    raceFeats: Feat[]
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
}
export type Archetype = {
    id: number,
    archetypeName: string;
    modifiers: Prerequisite | null,
    archetypeFeats: Feat[],
    levelAdjustment: number;
}

export type Region = {
    id: number;
    name: string
}