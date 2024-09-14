import { Weapon } from "../../interfaces";
import { Modifiers } from "../../Modifiers/ModifierInterface";

export type DicePopupProps = {
  textOrWeapon: string;
  value: number;
  modifiers: Modifiers[];
};
export type DicePopupWeaponProps = {
  type: string;
  weapon: Weapon;
  bab: number[];
  dmg: number;
  increments: number[];
  modifiers: Modifiers[];
};
