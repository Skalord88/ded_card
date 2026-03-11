import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { SpecialAttacks } from "../../interfaces";
import { SavingThrow } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { Speed } from "../../Speed/interface";
import { AllPrerequisiteMap } from "../interface/AllPrerequisite";
import { Prerequisite } from "../interface/Prerequisite";
import {
  ArmorClassElement,
  AttackRollElement,
  DamageBonusElement,
  SkillsElement
} from "./modifyCharacter";

export const findAllPrerequisiteModifier = (
  prerList: Prerequisite[]
): AllPrerequisiteMap => {
  

  const keys: string[] = prerList.flatMap(
    (prer) => [
      ...(prer.armorClass?.flatMap((ac) => ac.modifierBonus?.text ?? []) ?? []),
      ...(prer.attackRoll?.flatMap((ar) => ar.modifierBonus?.modifier ?? []) ?? []),
      ...(prer.damageBonus?.flatMap((db) => db.modifierBonus?.modifier ?? []) ?? [])
    ]
  );

  let allPrerequisite: AllPrerequisiteMap = keys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as AllPrerequisiteMap);

  console.log("keys", keys);

  console.log("allPrerequisite", allPrerequisite);
  return allPrerequisite;
};

export const findAbilitysPrerequisite = (
  prerList: Prerequisite[]
): Abilitys[] => {
  let onlyAbilitys: Abilitys[] = [];

  prerList.forEach((prer) => {
    prer.abilitys && onlyAbilitys.push(prer.abilitys);
  });

  return onlyAbilitys;
};

// export const findAttackRollPrerequisite = (
//   prerList: Prerequisite[]
// ): AttackRollElement => {
//   let mono: AttackRoll[] = [];
//   let target: AttackRoll[] = [];
//   let composed: Prerequisite[] = [];

//   prerList.forEach((prer) => {
//     if (prer.attackRoll) {
//       if (prer.attackRoll?.target === null) mono.push(prer.attackRoll);
//       const compose: string[] = ["ITEM", "WEAPON_TYPE", "SELECTED"];
//       if (prer.attackRoll?.target?.some((t) => !compose.includes(t)))
//         target.push(prer.attackRoll);
//       if (prer.attackRoll?.target?.some((t) => compose.includes(t))) {
//         composed.push({
//           attackRoll: {
//             bonus: prer.attackRoll.bonus,
//             target: null
//           },
//           weaponType: prer.weaponType,
//           items: prer.items
//         });
//       }
//     }
//   });

//   return { mono, target, composed };
// };

// export const findDamageBonusPrerequisite = (
//   prerList: Prerequisite[]
// ): DamageBonusElement => {
//   let mono: DamageBonus[] = [];
//   let target: DamageBonus[] = [];
//   let composed: Prerequisite[] = [];

//   prerList.forEach((prer) => {
//     if (prer.damageBonus) {
//       if (prer.damageBonus?.target === null) mono.push(prer.damageBonus);
//       const compose: string[] = ["ITEM", "WEAPON_TYPE", "SELECTED"];
//       if (prer.damageBonus?.target?.some((t) => !compose.includes(t)))
//         target.push(prer.damageBonus);
//       if (prer.damageBonus?.target?.some((t) => compose.includes(t))) {
//         composed.push({
//           damageBonus: {
//             bonus: prer.damageBonus.bonus
//           },
//           weaponType: prer.weaponType,
//           items: prer.items
//         });
//       }
//     }
//   });

//   return { mono, target, composed };
// };

export const findSpecialAttacksPrerequisite = (
  prerList: Prerequisite[]
): SpecialAttacks[] => {
  let onlySpecialAttacks: SpecialAttacks[] = [];

  prerList.forEach((prer) => {
    if (prer.specialAttacks !== null)
      prer.specialAttacks && onlySpecialAttacks.push(prer.specialAttacks);
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

export const findSavingThrowPrerequisite = (
  prerList: Prerequisite[]
): SavingThrow[] => {
  let onlySavingThrow: SavingThrow[] = [];
  prerList.forEach((prer) => {
    prer.savingThrow && onlySavingThrow.push(prer.savingThrow);
  });
  return onlySavingThrow;
};

// export const findArmorPrerequisite = (
//   prerList: Prerequisite[]
// ): ArmorClassElement => {
//   let mono: ArmorClass[] = [];
//   let target: ArmorClass[] = [];
//   let composed: Prerequisite[] = [];

//   prerList.forEach((prer) => {
//     if (prer.armorClass) {
//       if (prer.armorClass?.target === null) mono.push(prer.armorClass);
//       const compose: string[] = ["ITEM", "WEAPON_TYPE"];
//       if (prer.armorClass?.target?.some((t) => !compose.includes(t)))
//         target.push(prer.armorClass);
//       if (prer.armorClass?.target?.some((t) => compose.includes(t))) {
//         composed.push(prer);
//       }
//     }
//   });

//   return { mono, target, composed };
// };

export const findSkillsPrerequisite = (
  prerList: Prerequisite[]
): SkillsElement => {
  let mono: PrerequisiteSkills[] = [];
  let target: PrerequisiteSkills[] = [];

  prerList.forEach((prer) => {
    prer.skillStudy &&
      prer.skillStudy.forEach((sk) => {
        sk.target === null ? mono.push(sk) : target.push(sk);
      });
  });

  return { mono, target };
};

export const findSpeedPrerequisite = (prerList: Prerequisite[]): Speed => {
  return {
    foot: prerList.reduce(
      (tot, p) => tot + (p.speed ? Number(p.speed.foot) : 0),
      0
    ),
    fly: prerList.reduce(
      (tot, p) => tot + (p.speed ? Number(p.speed.fly) : 0),
      0
    ),
    climb: prerList.reduce(
      (tot, p) => tot + (p.speed ? Number(p.speed.climb) : 0),
      0
    ),
    swim: prerList.reduce(
      (tot, p) => tot + (p.speed ? Number(p.speed.swim) : 0),
      0
    ),
    special: prerList.map((p) => p.speed?.special).join(", ")
  };
};

export const findNumberOfDomanisPrerequisite = (
  prerList: Prerequisite[]
): number => {
  // console.log("prerList", prerList);
  return prerList.reduce(
    (tot, prer) =>
      tot + (prer.numberOfDomains != null ? Number(prer.numberOfDomains) : 0),
    0
  );
};
