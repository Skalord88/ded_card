import { ModifierEnum } from "./ModifierEnum";

export type ModifierBonus = {
  modifier?: ModifierEnum;
  bonus?: Number;
  modifierType?: ModifierEnum;
  target?: ModifierEnum[];
};
