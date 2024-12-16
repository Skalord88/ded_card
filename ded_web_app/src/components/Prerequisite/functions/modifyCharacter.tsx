import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { CountBabFromClassPc } from "../../Attack/Bab/Functions";
import { CharacterPc, SpecialAttacks } from "../../interfaces";
import { adjClass } from "../../Race/AdjClass";
import { FindAllAdjLevel } from "../../Race/Function";
import { changeAbilitysFromPrerequisite } from "../abilitys/functions/function";
import { Prerequisite } from "../interface/Prerequisite";
import {
  findAbilitysPrerequisite,
  findAttackRollPrerequisite,
  findInitiativePrerequisite,
  findSpecialAttacksPrerequisite
} from "./findSpecificPrerequisite";

export type CharToModify = {
  abilitys: Abilitys;
  bab: number;
  attackRoll: AttackRoll[];
  specialAttacks: SpecialAttacks[];
  initiative: number;
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
    attackRoll: findAttackRollPrerequisite(prer),
    specialAttacks: findSpecialAttacksPrerequisite(prer),
    initiative: findInitiativePrerequisite(prer)
  };
  console.log(newChar.attackRoll)
  return newChar;
};
