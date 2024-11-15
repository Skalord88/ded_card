import { Abilitys } from "../Abilitys/Interface";
import { Prerequisite } from "../Feats/Interface/FeatInterface";
import { CharacterPc } from "../interfaces";

export type Modifiers = {
    modifier: string;
    bonus: number;
    targets: string[];
    selected: Prerequisite[][]
}

export type ModifiedCharProps = {
    char: CharacterPc,
    abilitys: Abilitys
    bab: number
  }