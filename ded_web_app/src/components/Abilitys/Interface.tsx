import { ModifierEnum, ModifierType } from "../Prerequisite/interface/ModifierEnum";

export type Abilitys = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    modifierType?: ModifierEnum;
  }

export type AbilitysProps = {
  abilitys: Abilitys
}

export type LevelAbilitys = {
  level: number;
  abilitys: Abilitys;
}