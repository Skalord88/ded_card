import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { SpecialAttacksList } from "../../Attack/function";
import { Weapon } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { Resistance } from "../../Saving/interface";

export type DicePopupProps = {
  textOrWeapon: string;
  value: number;
  modifiers: DiceModifiers;
};

export type DiceModifiers = {
  attackRoll: AttackRoll[] | null;
  specialAttacks: SpecialAttacksList[] | null;
  savingThrow: Resistance[] | null;
}

export type DicePopupWeaponProps = {
  type: string;
  weapon: Weapon;
  bab: number[];
  dmg: number;
  increments: number[];
  modifiers: Prerequisite;
};
