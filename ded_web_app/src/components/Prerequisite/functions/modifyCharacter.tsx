import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { CountBabFromClassPc } from "../../Attack/Bab/Functions";
import { CharacterPc, Inventory, SpecialAttacks } from "../../interfaces";
import { adjClass } from "../../Race/AdjClass";
import { FindAllAdjLevel } from "../../Race/Function";
import { CountSavingThrowFromClassPc } from "../../Saving/Functions";
import { SavingThrow } from "../../Saving/interface";
import { emptyInventory } from "../../variables";
import { CountHitDicesFromAdj, CountHitDicesFromClassPc, HitDices } from "../../Vita/Functions";
import { changeAbilitysFromPrerequisite } from "../abilitys/functions/function";
import { Prerequisite } from "../interface/Prerequisite";
import {
  findAbilitysPrerequisite,
  findAttackRollPrerequisite,
  findInitiativePrerequisite,
  findSavingThrowPrerequisite,
  findSpecialAttacksPrerequisite
} from "./findSpecificPrerequisite";

export type CharToModify = {
  abilitys: Abilitys;
  bab: number;
  adjBonus: {bab: number, savingThrow: number, adjLv: number};
  attackRoll: AttackRoll[];
  specialAttacks: SpecialAttacks[];
  initiative: number;
  baseSave: {fortitude: number, reflex: number, will: number};
  savingThrow: SavingThrow[];
  listHitDices: HitDices[];
  inventory: Inventory;
};

export const modifyCharacter = (
  char: CharacterPc,
  prer: Prerequisite[]
): CharToModify => {
  const abilitys: Abilitys[] = findAbilitysPrerequisite(prer);
  const adjBab: number = Math.floor(
    CountBabFromClassPc(char) + FindAllAdjLevel(char) * adjClass.classBab
  );

  const newChar: CharToModify = {
    abilitys: changeAbilitysFromPrerequisite(char.abilitys, abilitys),
    bab: adjBab,
    adjBonus: {
      bab: adjBab, 
      savingThrow: FindAllAdjLevel(char) * adjClass.classBab,
      adjLv: FindAllAdjLevel(char)
    },
    attackRoll: findAttackRollPrerequisite(prer),
    specialAttacks: findSpecialAttacksPrerequisite(prer),
    initiative: findInitiativePrerequisite(prer),
    baseSave: CountSavingThrowFromClassPc(char.classPcList),
    savingThrow: findSavingThrowPrerequisite(prer),
    listHitDices: CountHitDicesFromAdj(
      FindAllAdjLevel(char), 
      CountHitDicesFromClassPc(char.classPcList)
    ),
    inventory: emptyInventory
  };
  return newChar;
};
