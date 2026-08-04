import {
  EMPTY_BONUS,
  modifierEnumList
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { BonusResultMap, BonusSource } from "./GetBonusResult";
import { isGlobalBonus } from "./IsGlobalBonus";
import { isToAdd } from "./ModifiedCharacter";
import { resolveBonuses } from "./ResolvesBonuses";

export const createTotAndBonusElement = (
    map: BonusResultMap,
    testo:boolean,
    search?:(string|number)[]
):TotAndBonusElement[]=>{

  return resolveBonuses(map, search).map(({ key, bonus }) => ({

    bonus: bonus.bonus,

    text: testo ? key : undefined,

    pop:
        modifierEnumList.find(m => m.text === bonus.text) ?? {
            ...EMPTY_BONUS,
            description: key,
            text: bonus.text
        }

}));

    // return resolveBonuses(map,search).map(v=>({

    //     bonus:v.bonus,

    //     text:testo ? v.key : undefined,

    //     pop:
    //         modifierEnumList.find(m=>m.text===v.text)
    //         ??
    //         {
    //             ...EMPTY_BONUS,
    //             description:v.key,
    //             text:v.text
    //         }

    // }));

}

// export const createTotAndBonusElement = (
//   map: BonusResultMap,
//   testo: boolean,
//   serch?: (string | number)[],
//   consoleLog?: boolean
// ): TotAndBonusElement[] => {
//   let list: TotAndBonusElement[] = [];

//   if (consoleLog) {
//     // console.log("MAP:", map);
//     // console.log();
//     // console.log("SEARCH:", serch);
//   }

//   Object.entries(map).forEach(([key, value]) => {
//     if (consoleLog) {
//       //   console.log("KEY:", key, "VALUES:", value);
//       //   // console.log();
//       //   console.log("SEARCH:", serch);
//     }

//     if (!serch || serch.length <= 0) {

//       const candidates = serch
//   ? value.filter((v) => checkBonusTarget(v, serch))
//   : value.filter(isGlobalBonus);

// const valuesToUse = isToAdd(key)
//   ? candidates
//   : chooseBestBonuses(candidates, key);
//       // const filtered: BonusSource[] = value.filter(
//       //   (v: BonusSource) => !v.targets || v.targets.length === 0
//       // );

//       // Se il tipo di bonus non si somma, prendo solo il più alto
//       // const valuesToUse: BonusSource[] = isToAdd(key)
//       //   ? filtered
//       //   : filtered.length > 0
//       //     ? [
//       //         filtered.reduce((best, current) => {
//       //           // entrambi malus: scelgo quello meno penalizzante
//       //           if (best.bonus < 0 && current.bonus < 0) {
//       //             return current.bonus > best.bonus ? current : best;
//       //           }

//       //           // altrimenti scelgo il valore più alto
//       //           return current.bonus > best.bonus ? current : best;
//       //         })
//       //       ]
//       //     : [];

//       // const valuesToUse: BonusSource[] = isToAdd(key)
//       //   ? filtered
//       //   : filtered.length > 0
//       //     ? filtered
//       //     : [];

//       valuesToUse.forEach((v: BonusSource) => {
//         list.push(
//           /// testo serve a ritornare la description (falso in abilita')
//           testo
//             ? {
//                 bonus: v.bonus,
//                 text: key,
//                 pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
//                   ...EMPTY_BONUS,
//                   description: key,
//                   text: v.text
//                 }
//               }
//             : {
//                 bonus: v.bonus,
//                 text: undefined,
//                 pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
//                   ...EMPTY_BONUS,
//                   description: key,
//                   text: v.text
//                 }
//               }
//         );
//       });
//     }

//     // if (consoleLog) {console.log("SEARCH:", serch)}
//     // NON toccato

//     if (serch) {

//   const specific = value.filter(
//     (v) =>
//       v.targets &&
//       v.targets.length > 0 &&
//       checkBonusTarget(v, serch)
//   );

//   const global = value.filter(
//     (v) =>
//       !v.targets ||
//       v.targets.length === 0
//   );

//   const matched = specific.length > 0
//     ? specific
//     : global;

// //     console.log(
// //   "KEY:",
// //   key,
// //   "specific:",
// //   specific,
// //   "global:",
// //   global,
// //   "matched:",
// //   matched
// // );

//   const valuesToUse = chooseBestBonuses(matched, key);

//   // console.log(chooseBestBonuses(matched,"Ability Modifier"))


//   valuesToUse.forEach((v) => {
//     list.push({
//       bonus: v.bonus,
//       text: key,
//       pop: modifierEnumList.find((m) => m.text === v.text) || {
//         ...EMPTY_BONUS,
//         description: key,
//         text: typeof v.text === "string" ? v.text : v.text
//       }
//     });
//   });
// }
//     // if (serch) {
//     //   value.forEach((v) => {
//     //     // const match = checkBonusTarget(v, serch);
//     //     const match = value.filter((v) => checkBonusTarget(v, serch));
//     //     //       v.targets
//     //     // ? v.targets.every((t) =>
//     //     //     serch.some((s) =>
//     //     //       ("id" in t && t.id === s) ||
//     //     //       ("text" in t && t.text === s)
//     //     //     )
//     //     //   )
//     //     // : true;

//     //     // const match = v.targets
//     //     //   ? v.targets.every(t =>
//     //     //       serch.some(s =>
//     //     //         s === (t as Item)?.id ||
//     //     //         s === (t as ModifierEnum)?.text
//     //     //       )
//     //     //     )
//     //     //   : serch.some(s =>
//     //     //       s === (v.source as Item)?.id ||
//     //     //       s === (v.source as ModifierEnum)?.text
//     //     //     );

//     //     if (match) {
//     //       list.push({
//     //         bonus: v.bonus,
//     //         text: key,
//     //         pop: modifierEnumList.find((m) => m.text === v.text) || {
//     //           ...EMPTY_BONUS,
//     //           description: key,
//     //           text: typeof v.text === "string" ? v.text : v.text
//     //         }
//     //       });
//     //     }
//     //   });
//     //   //   value.forEach((v) => {
//     //   //     serch.forEach((s) => {
//     //   //       if (
//     //   //         s === (v.source as Item)?.id ||
//     //   //         s === (v.source as ModifierEnum)?.text
//     //   //       ) {
//     //   //         if (consoleLog) {
//     //   //           console.log(
//     //   //             // "v",  v
//     //   //             "SEARCH:",
//     //   //             s,
//     //   //             "SOURCE:",
//     //   //             (v.source as ModifierEnum).text || (v.source as Item)?.id
//     //   //           );
//     //   //         }
//     //   //         list.push({
//     //   //           bonus: v.bonus,
//     //   //           text: key,
//     //   //           pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
//     //   //             ...EMPTY_BONUS,
//     //   //             description: key,
//     //   //             text: v.text
//     //   //           }
//     //   //         });
//     //   //       }
//     //   //     });
//     //   //   });
//     // }
//   });

//   return list;
// };
export const chooseBestBonuses = (
  bonuses: BonusSource[],
  key: string,
  search?: (string | number)[]
): BonusSource[] => {

  if (isToAdd(key)) {
    return bonuses;
  }

  if (bonuses.length === 0) {
    return [];
  }


  // se ci sono bonus specifici per il contesto,
  // scartiamo quelli globali
  const specific = bonuses.filter(
    b => b.targets && b.targets.length > 0
  );

  const candidates =
    specific.length > 0
      ? specific
      : bonuses;


  return [
    candidates.reduce((best, current) => {

      // entrambi negativi:
      // scelgo quello più penalizzante per D&D
      if (best.bonus < 0 && current.bonus < 0) {
        return current.bonus < best.bonus
          ? current
          : best;
      }


      // uno positivo uno negativo:
      // deve vincere il modificatore specifico già filtrato sopra
      return current.bonus > best.bonus
        ? current
        : best;

    })
  ];
};

// export const chooseBestBonuses = (
//   bonuses: BonusSource[],
//   key: string
// ): BonusSource[] => {
//   if (bonuses.length === 0) {
//     return [];
//   }

//   // Bonus cumulabili (es. untyped, ability, ecc.)
//   if (isToAdd(key)) {
//     return bonuses;
//   }

  

//   // Bonus dello stesso tipo: si applica solo il migliore
//   return [
//     bonuses.reduce((best, current) => {
//       // Se entrambi sono malus, scelgo quello meno negativo
//       if (best.bonus < 0 && current.bonus < 0) {
//         return current.bonus > best.bonus ? current : best;
//       }

//       // Negli altri casi prendo il valore più alto
//       return current.bonus > best.bonus ? current : best;
//     })
//   ];
// };

export const checkBonusTarget = (
  bonus: BonusSource,
  search:(string|number)[]
):boolean => {

  if(!bonus.targets || bonus.targets.length === 0){
    return true;
  }


  const hasItemTarget = bonus.targets.some(
    t => typeof t !== "string" && "id" in t
  );


  if(hasItemTarget){

    // oggetto + tipo attacco
    // devono essere presenti entrambi
    return bonus.targets.every(t =>
      search.some(s =>
        ("id" in t && t.id === s) ||
        ("text" in t && t.text === s)
      )
    );

  }


  // Grapple, Melee, Ranged, ecc.
  return bonus.targets.some(t =>
    search.some(s =>
      ("text" in t && t.text === s)
    )
  );

};

// export const checkBonusTarget = (
//   bonus: BonusSource,
//   search: (string | number)[]
// ): boolean => {

//   // Se non ha target è un bonus globale
//   if (!bonus.targets || bonus.targets.length === 0) {
//     return true;
//   }

//   // Tutti i target devono essere soddisfatti
//   return bonus.targets.every((target) =>
//   // return bonus.targets.some((target) =>
//     search.some((s) =>
//       ("id" in target && target.id === s) ||
//       ("text" in target && target.text === s)
//     )
//   );
// };

// export const isStackingBonus = (bonus: BonusSource): boolean => {
//   return isToAdd(bonus.modifierType?.text ?? "");
// };