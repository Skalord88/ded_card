import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";

export type Abilitys = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    modifierBonus?: ModifierEnum;
  }

export type AbilitysProps = {
  abilitys: Abilitys
}