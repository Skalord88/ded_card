import { Alignment } from "../Alignment/Alignment";
import { Deity } from "../Deity/interface";
import { Feat } from "../Feats/Interface/FeatInterface";
import { Armor, Item, Shield, Weapon } from "../interfaces";
import { SubRace } from "../Race/Interfaces";

export type Region = {
    id: number;
    name: string;
    regionalAlignment: Alignment[];
    description: string;
}

export type RacialRegion = {
    id: number;
    racialRegion: string;
    name: string;
    region: Region;
    regionalSubRaces: SubRace[];
    automaticLanguages: string[];
    bonusLanguages: string[];
    preferedDeities: Deity[];
    regionalFeats: Feat[];
    regionalItemsOpOne: (Weapon | Shield | Armor | Item)[];
    regionalItemsOpTwo: (Weapon | Shield | Armor | Item)[];
    regionalItemsOpThree: (Weapon | Shield | Armor | Item)[];
}