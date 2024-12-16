import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { SpecialAttacks } from "../../interfaces";
import { Prerequisite } from "../interface/Prerequisite";

export const findAbilitysPrerequisite = (
  prerList: Prerequisite[]
): Abilitys[] => {
  let onlyAbilitys: Abilitys[] = [];

  prerList.forEach((prer) => {
    if (prer.abilitys !== null) onlyAbilitys.push(prer.abilitys);
  });

  return onlyAbilitys;
};

export const findAttackRollPrerequisite = (
  prerList: Prerequisite[]
): AttackRoll[] => {
  let onlyAttackRoll: AttackRoll[] = [];

  prerList.forEach((prer) => {
    if (prer.attackRoll !== null) onlyAttackRoll.push(prer.attackRoll);
  });

  return onlyAttackRoll;
};

export const findSpecialAttacksPrerequisite = (
  prerList: Prerequisite[]
): SpecialAttacks[] => {
  let onlySpecialAttacks: SpecialAttacks[] = [];

  prerList.forEach((prer) => {
    if (prer.specialAttacks !== null)
      onlySpecialAttacks.push(prer.specialAttacks);
  });

  return onlySpecialAttacks;
};

export const findInitiativePrerequisite = (
  prerList: Prerequisite[]
): number => {
  return prerList.reduce(
    (tot, prer) =>
      tot + (prer.initiative != null ? Number(prer.initiative) : 0),
    0
  );
};
