import { Prerequisite } from "../../Feats/Interface/FeatInterface";
import { Weapon } from "../../interfaces";
import { Modifiers } from "../ModifierInterface";

export function BabBonusModification(modifiers: Modifiers[]): [number, string] {
  const mod = modifiers.find((mod) => mod.modifier === "ATTACK_ROLL");
  return mod ? [mod.bonus, ""] : [0, ""];
}
export function FindBabModifiers(
  modifiers: [number, string][]
): [number, string] {
  const mod = modifiers.find((mod) => mod[1] === "ATTACK_ROLL");
  return mod ? [mod[0], ""] : [0, ""];
}

export function CountSpecificBabBonusInModification(
  mod: Modifiers
): [number, string] {
  return [mod.bonus, mod.targets[0]];
}
//
export function ModifiedWeaponBabBonus(
  list: Prerequisite,
  weapon: Weapon
): boolean {
  
  return false;
}

export function FindWeaponToModified(
  specific: Modifiers[],
  weapon: Weapon
): { find: boolean; bonus: number } {
  // const found = specific.find((special) =>
    // ModifiedWeaponBabBonus(special.selected, weapon)
  // );
  return {find: true, bonus: 0}
  //  ? { find: true, bonus: found.bonus } : { find: false, bonus: 0 };
}
