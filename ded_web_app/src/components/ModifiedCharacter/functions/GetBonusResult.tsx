import { FormattingText } from "../../Formatting/Function";
import { Item } from "../../interfaces";
import {
  EMPTY_BONUS,
  ModifierEnum,
  ModifierType
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export type TargetBonus = ModifierEnum | Item;

export type BonusSource = {
  bonus: number;
  text: string;
  targets?: TargetBonus[];
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

  // if(consoleLog) console.log("allPrerequisite", allPrerequisite);

  const createBonusResult = (
    bonus: number,
    text: ModifierType | string,
    modifier: ModifierEnum | null,
    targets?: (ModifierEnum | Item)[]
  ) => {
    const key = modifier?.name || "Untyped";

    if (!allModifiers[key]) {
      allModifiers[key] = [];
    }

    const bonusText = typeof text === "string" ? text : text;

    if (!targets) {
      allModifiers[key].push({
        bonus,
        text: bonusText
      });
    } else {
      allModifiers[key].push({
        bonus,
        text: bonusText,
        targets
      });
    }
  };

  const createTargets = (
    prer: Prerequisite,
    targets: ModifierEnum[]
  ): (ModifierEnum | Item)[] => {
    const trg: (ModifierEnum | Item)[] = [];

    targets.forEach((t) => {
      if (t.text === "Item") {
        if (prer.items) {
          trg.push(...prer.items);
        }
      } else if (t.text === "Weapon Type") {
        if (prer.weaponType) {
          trg.push(prer.weaponType);
        }
      } else if (t.text === "Armor Type") {
        if (prer.armorType) {
          trg.push(prer.armorType);
        }
      } else {
        trg.push(t);
      }
    });

    return trg;
  };

  allPrerequisite.forEach((prer) => {
    if (bonusType === "attackRoll") {
      // console.log(a.modifierType as ModifierEnum)
      prer?.attackRoll?.forEach((a) => {
        if (!a.target) {
          createBonusResult(
            a.bonus as number,
            prer.text || "",
            (a.modifierType as ModifierEnum) || null
          );
        } else {
          // if(prer.id === 9002) console.log("a.target", a.target);

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
            (d.modifierType as ModifierEnum) || null
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
        if (consoleLog) {
          console.log("sS", sS);
        }

        // const skillStudyTarget = sS.skill?.skillName || sS.study?.studyName;
        const skillStudyTarget =
          sS.skill?.skillName ||
          sS.study?.studyName ||
          sS.study?.skill?.skillName;
        // console.log("TARGET:", skillStudyTarget?.name);
        if (!skillStudyTarget) return;

        const modifier = sS.modifierType as ModifierEnum;

        if (!sS.target) {
          createBonusResult(sS.rank as number, prer.text || "", modifier, [
            skillStudyTarget
          ]);
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, sS.target);

          trg.push(skillStudyTarget);

          createBonusResult(
            sS.rank as number,
            skillStudyTarget.name || "",
            modifier,
            trg
          );
        }
      });
    }

    // if (bonusType === "skillStudy") {
    //   prer?.skillStudy?.forEach((sS) => {
    //     if (consoleLog) {
    //         console.log("sS", sS);
    //       }
    //     if (!sS.target) {

    //       // if (consoleLog) {console.log("skill/study", sS.skill?.skillName, sS.study?.studyName, sS.modifierType)}

    //       createBonusResult(
    //         sS.rank as number,
    //         prer.text || "",
    //         (sS.modifierType as ModifierEnum) || null,
    //         [
    //           sS.skill?.skillName || sS.study?.studyName as ModifierEnum
    //         ]
    //       );
    //     } else {
    //       const trg: (ModifierEnum | Item)[] = createTargets(prer, sS.target);

    //       trg.push(
    //         sS.skill?.skillName || sS.study?.studyName as ModifierEnum
    //       );

    //       createBonusResult(
    //         sS.rank as number,
    //         (sS.skill?.skillName || sS.study?.studyName)?.name || "",
    //         sS.modifierType as ModifierEnum,
    //         trg
    //       );
    //       // }
    //     }
    //   });
    // }

    if (bonusType === "abilitys") {
      if (prer && prer.abilitys) {
        const modifier = prer.abilitys.modifierType;
        // if(consoleLog) console.log("modifier", modifier)
        Object.entries(prer.abilitys).forEach(([ab, value]) => {
          // if (value == 0 && typeof value !== "number") return;
          if (modifier) {
            if (value !== 0 && typeof value === "number")
              createBonusResult(value, ab, modifier);
          } else {
            if (value !== 0 && typeof value === "number")
              createBonusResult(value, ab, {
                ...EMPTY_BONUS,
                description: prer.text,
                text: "Increase"
              });
          }
        });
      }
    }
  });

  if (consoleLog) {
    console.log("allModifiers", allModifiers);
  }

  return allModifiers;
};
