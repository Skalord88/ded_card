import { ModifierEnum, ModifierType } from "./ModifierEnum";

export type ModifierBonus = {
  modifier?: ModifierEnum;
  bonus?: number;
  modifierType?: ModifierEnum;
  target?: ModifierEnum[];
};
