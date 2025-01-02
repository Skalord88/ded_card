import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { SpecialAttacksList } from "../../Attack/function";
import { SignAndNumber, Weapon } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";

export type DicePopupProps = {
  textOrWeapon: string;
  value: number;
  modifiers: DiceModifiers;
};

export type DiceModifiers = {
  attackRoll?: AttackRoll[];
  specialAttacks?: SpecialAttacksList[];
  savingThrow?: Resistance[];
  skills?: PrerequisiteSkills;
  composed?: Prerequisite[]
} | null;

export type DicePopupWeaponProps = {
  type: string;
  weapon: Weapon;
  bab: number[];
  dmg: number;
  bucklerMls: number;
  targetMod?: AttackRoll[];
};

export type AllModifiersInThrow = {
  tot: {value: SignAndNumber, mod: string};
  allMod: {value: SignAndNumber, mod: string} [];
}
