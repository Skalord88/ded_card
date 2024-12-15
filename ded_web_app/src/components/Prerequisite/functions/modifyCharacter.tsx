import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { CountBabFromClassPc } from "../../Attack/Bab/Functions";
import { CharacterPc, SpecialAttacks } from "../../interfaces";
import { adjClass } from "../../Race/AdjClass";
import { FindAllAdjLevel } from "../../Race/Function";
import { emptySpecialAttacks } from "../../variables";
import { changeAbilitysFromPrerequisite } from "../abilitys/functions/function";
import { Prerequisite } from "../interface/Prerequisite";
import { changeSpecialAttacksFromPrerequisite } from "../specialAttacks/function/function";
import {
  findAbilitysPrerequisite,
  findSpecialAttacksPrerequisite
} from "./findSpecificPrerequisite";

export type CharToModify = {
  abilitys: Abilitys;
  bab: number;
  attackRoll: AttackRoll;
  specialAttacks: SpecialAttacks;
};

export const modifyCharacter = (
  char: CharacterPc,
  prer: Prerequisite[]
): CharToModify => {
  const abilitys: Abilitys[] = findAbilitysPrerequisite(prer);
  const adjBab: number = Math.floor(
    CountBabFromClassPc(char) + FindAllAdjLevel(char) * adjClass.classBab
  );
  const specialAttacks: SpecialAttacks[] = findSpecialAttacksPrerequisite(prer);

  const newChar: CharToModify = {
    abilitys: changeAbilitysFromPrerequisite(char.abilitys, abilitys),
    bab: adjBab,
    attackRoll: {},
    specialAttacks: changeSpecialAttacksFromPrerequisite(emptySpecialAttacks, specialAttacks)
  };
  return newChar;
};
