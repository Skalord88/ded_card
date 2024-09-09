import { Abilitys } from "../Abilitys/Interface";
import { CharacterPc } from "../interfaces";

export type Modifiers = {
    modifier: string;
    bonus: number;
    targets: string[];
}

export type ModifiedCharProps = {
    char: CharacterPc,
    abilitys: Abilitys
  }