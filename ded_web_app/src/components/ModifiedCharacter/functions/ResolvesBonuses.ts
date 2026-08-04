import { checkBonusTarget, chooseBestBonuses } from "./CreateTotAndBonusElement";
import { BonusResultMap, BonusSource } from "./GetBonusResult";

export type ResolvedBonus = {
  key: string;
  bonus: BonusSource;
};


export const resolveBonuses = (
  map: BonusResultMap,
  search?: (string | number)[]
): ResolvedBonus[] => {

  const result: ResolvedBonus[] = [];

  Object.entries(map).forEach(([key, values]) => {

    let applicable: BonusSource[];

    if (!search || search.length === 0) {

      // esempio: Base Attack
      // prendo solo bonus globali
      applicable = values.filter(
        v => !v.targets || v.targets.length === 0
      );

    } else {

      // esempio: Grapple, Melee, Ranged...
      // tengo:
      // - bonus globali
      // - bonus specifici che matchano
      applicable = values.filter(
        v =>
          !v.targets ||
          v.targets.length === 0 ||
          checkBonusTarget(v, search)
      );
    }


    const selected = chooseBestBonuses(applicable, key);

    selected.forEach(bonus => {
      result.push({
        key,
        bonus
      });
    });

  });


  return result;
};

// export type ResolvedBonus = {
//   key: string;
//   bonus: BonusSource;
// };

// export const resolveBonuses = (
//   map: BonusResultMap,
//   search?: (string | number)[]
// ): ResolvedBonus[] => {

//   const result: ResolvedBonus[] = [];

//   Object.entries(map).forEach(([key, values]) => {

//     const applicable =
//       search && search.length > 0
//         ? values.filter(v => checkBonusTarget(v, search))
//         : values.filter(v => !v.targets || v.targets.length === 0);

//     chooseBestBonuses(applicable, key).forEach(bonus => {
//       result.push({
//         key,
//         bonus
//       });
//     });

//   });

//   return result;
// };

// export const resolveBonuses = (
//     map: BonusResultMap,
//     search?: (string | number)[]
// ): BonusSource[] => {

//     let result: BonusSource[] = [];

//     Object.entries(map).forEach(([key, values]) => {

//         // scelgo i bonus applicabili
//         const applicable =
//             search && search.length > 0
//                 ? values.filter(v => checkBonusTarget(v, search))
//                 : values.filter(v => !v.targets || v.targets.length === 0);

//         if (applicable.length === 0) {
//             return;
//         }

//         result.push(...chooseBestBonuses(applicable, key));

//     });

//     return result;
// };