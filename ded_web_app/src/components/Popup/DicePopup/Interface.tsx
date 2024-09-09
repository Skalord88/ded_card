import { Weapon } from "../../interfaces";
import { Modifiers } from "../../Modifiers/ModifierInterface";

export type DicePopupProps = {
    textOrWeapon: string | Weapon;
    value: number;
    modifiers: Modifiers[];
  }