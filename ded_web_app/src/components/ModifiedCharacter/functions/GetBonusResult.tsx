import { Item } from "../../interfaces";
import {
  EMPTY_BONUS,
  ModifierEnum
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export type TargetBonus = ModifierEnum | Item;

export type BonusSource = {
  bonus: number;
  text: ModifierEnum | string;
  source?: ModifierEnum | Item;
};

export type BonusResultMap = {
  [modifier: string]: BonusSource[];
};
export const getBonusResult = (
  allPrerequisite: Prerequisite[],
  bonusType: string,
  consoleLog?: boolean
): BonusResultMap => {
  const allModifiers: BonusResultMap = {};

  const createBonusResult = (
    bonus: number,
    text: ModifierEnum | string,
    modifier: ModifierEnum,
    targets?: (ModifierEnum | Item)[]
  ) => {
    const key: string = modifier?.text;

    if (!allModifiers[key]) {
      allModifiers[key] = [];
    }

    if (!targets) {
      const newBonusResult: BonusSource = { bonus, text};
      allModifiers[key].push(newBonusResult);
    } else {
      targets.forEach((t) => {
        const newBonusResult: BonusSource = {
          bonus,
          text,
          source: t
        };
        allModifiers[key].push(newBonusResult);
      });
    }
  };

  const createTargets = (
    prer: Prerequisite,
    targets: ModifierEnum[]
  ): (ModifierEnum | Item)[] => {
    let trg = [] as (ModifierEnum | Item)[];
    let check: boolean = true;
    targets.forEach((t) => {
      if (t.text === "Item" && prer.items) {
        prer.items.forEach((i) => trg.push(i));
        check = false;
      }
      if (t.text === "Weapon Type" && prer.weaponType) {
        trg.push(prer.weaponType);
        check = false;
      }
      if (t.text === "Armor Type" && prer.armorType) {
        trg.push(prer.armorType);
        check = false;
      }
      if (check) {
        trg.push(t);
        check = true;
      }
    });
    return trg;
  };

  allPrerequisite.forEach((prer) => {
    if (bonusType === "attackRoll") {
      prer?.attackRoll?.forEach((a) => {
        if (!a.target) {
          createBonusResult(
            a.bonus as number,
            prer.text || "",
            (a.modifierType as ModifierEnum) || null
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, a.target);
          createBonusResult(
            a.bonus as number,
            prer.text || "",
            (a.modifierType as ModifierEnum) || null,
            trg
          );
        }
      });
    }
    if (bonusType === "damageBonus") {
      prer?.damageBonus?.forEach((d) => {
        if (!d.target) {
          createBonusResult(
            d.bonus as number,
            prer.text || "",
            d.modifierType as ModifierEnum
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, d.target);

          createBonusResult(
            d.bonus as number,
            prer.text || "",
            d.modifierType as ModifierEnum,
            trg
          );
        }
      });
    }
    if (bonusType === "armorClass") {
      prer?.armorClass?.forEach((aR) => {
        if (!aR.target) {
          createBonusResult(
            aR.bonus as number,
            prer.text || "",
            (aR.modifierType as ModifierEnum) || null
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, aR.target);

          createBonusResult(
            aR.bonus as number,
            prer.text || "",
            (aR.modifierType as ModifierEnum) || null,
            trg
          );
        }
      });
    }
    if (bonusType === "savingThrow") {
      prer?.savingThrow?.forEach((sT) => {
        if (!sT.target) {
          createBonusResult(
            sT.bonus as number,
            prer.text || "",
            (sT.modifierType as ModifierEnum) || null
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, sT.target);

          createBonusResult(
            sT.bonus as number,
            prer.text || "",
            sT.modifierType as ModifierEnum,
            trg
          );
        }
      });
    }
    if (bonusType === "skillStudy") {
      prer?.skillStudy?.forEach((sS) => {
          if (!sS.target) {
            createBonusResult(
              sS.rank as number,
              prer.text || "",
              (sS.modifierBonus as ModifierEnum) || null
              , [{...EMPTY_BONUS, 
                text: sS.skill?.skillName.text || sS.study?.studyName || "" 
              } as ModifierEnum]
            );
          } else {
            const trg: (ModifierEnum | Item)[] = createTargets(prer, sS.target);

            trg.push({...EMPTY_BONUS, 
              text: sS.skill?.skillName.text || sS.study?.studyName || "" 
            } as ModifierEnum);

            createBonusResult(
              sS.rank as number,
              sS.skill?.skillName.text || sS.study?.studyName || "",
              sS.modifierBonus as ModifierEnum,
              trg
            );
          // }
        }
      });
    }

    if (bonusType === "abilitys") {
      if (prer && prer.abilitys) {
        const modifier = prer.abilitys.modifierBonus;
        // console.log("modifier", modifier)
        Object.entries(prer.abilitys).forEach(([ab, value]) => {
          if (modifier) {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, ab, modifier);
          } else {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, ab, {
                ...EMPTY_BONUS,
                description: prer.text,
                text: "Increase"
              });
          }
        });
      }
    }
    if (consoleLog) {
      console.log("allModifiers", allModifiers);
    }
  });

  return allModifiers;
};

// export const prerequisiteToTotAndBonusList = (
//   prerequisiteAll: Prerequisite[],
//   text: string
// ): TotAndBonusElement[] => {
//   let list: TotAndBonusElement[] = [];
//   if (text === "attackRoll") {
//     prerequisiteAll.map((pre) => {
//       if (pre && pre.attackRoll) {
//         pre.attackRoll.forEach((att) => {
//           const trg = att.target;
//           if (trg && trg.length > 0) {
//             trg.forEach((t) => {
//               if (t.text === "Item" && pre.items) {
//                 pre.items.forEach((i) =>
//                   list.push({
//                     bonus: att.bonus as number,
//                     text: i.name,
//                     pop: att.modifierBonus || { text: "" }
//                   })
//                 );
//               }
//             });
//           } else {
//             list.push({
//               bonus: att.bonus as number,
//               text: pre.text,
//               pop: att.modifierBonus || { text: "Increase" }
//             });
//           }
//         });
//       }
//     });
//   }
//   return list;
// };
