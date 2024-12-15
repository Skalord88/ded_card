import { Weapon } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export type DicePopupProps = {
  textOrWeapon: string;
  value: number;
  // modifiers: Prerequisite;
};
export type DicePopupWeaponProps = {
  type: string;
  weapon: Weapon;
  bab: number[];
  dmg: number;
  increments: number[];
  modifiers: Prerequisite;
};
