import { Size } from "../Size/Interfaces"
import { Feat } from "../Feats/Interface/FeatInterface"
import { Modifiers } from "../Modifiers/ModifierInterface"

export type Race = {
    id: number,
    raceName: string,
    avatarRaceUrl: string,
    modifiers: Modifiers[]
}

export type SubRace = {
    id: number,
    race: Race;
    subRacesName: string;
    avatarUrl: string;
    modifiers: Modifiers[],
    raceFeats: Feat[],
    levelAdjustment: number;
    size: Size;
    availableRegions: Region[]
}

export type Region = {
    id: number;
    name: string
}