import { DiceText } from "../../Dice/Functions";
import { signAndCountToString } from "../../functions";
import { WeaponElement } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { FightOptions, DamageWeaponChar } from "./createDefenceOptions";

export const textCreateAttackOptions = (
  w: WeaponElement,
  d: DamageWeaponChar
) => {
  return (
    signAndCountToString([w.babMelee ?? 0], true) +
    " " +
    w.weapon?.name +
    " " +
    w.weapon?.damage +
    (d.charDamage < 0 ? "-" : "+") +
    d.charDamage +
    " " +
    DiceText(d.weaponCrit)
  );
};

export const createElementAttackOption = (
  weaponElement?: WeaponElement,
  weaponBab?: number,
  weaponDamage?: string,
  weaponCritical?: string,
  charDamage?: number
): FightOptions => {
  // if(!weaponElement || !weaponDamage || !weaponCritical || !charDamage) return null
  const damages: DamageWeaponChar = {
    weaponDamage: weaponDamage ?? "",
    weaponCrit: weaponCritical ?? "",
    charDamage: charDamage ?? 0
  };
  return {
    text: weaponElement ? textCreateAttackOptions(weaponElement, damages) : "",
    number: Math.floor(weaponBab ?? 0),
    damage: damages
  };
};
