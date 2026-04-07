import { Item, ModifierBonus, Weapon } from "../../interfaces";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { AllModifiers, BonusResult } from "../interface/ModifiedCharacter";

export type TargetBonus = ModifierEnum | Item;

export type BonusSource = {
  bonus: number;
  text: string;
  source?: TargetBonus;
};

export type BonusResultMap = {
  [modifier: string]: BonusSource[];
};
export const getBonusResult = (
  allPrerequisite: Prerequisite[],
  bonusType: string
): BonusResultMap => {
  const allModifiers: BonusResultMap = {};

  const createBonusResult = (
    bonus: number,
    text: string,
    modifier: ModifierEnum,
    targets?: (ModifierEnum | Item)[]
  ) => {
    if (bonus === 0 && !modifier) return;
    const key: string = modifier? modifier.text : "increase"
    if (!allModifiers[key]) {
      allModifiers[key] = [] as BonusSource[];
    }
    if (!targets && modifier) {
      const newBonusResult = { bonus: bonus, text: text };
      allModifiers[key].push(newBonusResult);
    } else {
      // console.log("targets", targets)
      targets && targets.forEach((t) => {
        const newBonusResult = {
          bonus: bonus,
          text: text,
          source: (t as Item) ? (t as Item) : (t as ModifierEnum)
        };
        modifier && allModifiers[key].push(newBonusResult);
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
      prer.attackRoll?.forEach((a) => {
        if (!a.target) {
          createBonusResult(
            a.bonus as number,
            a.modifierBonus as ModifierEnum,
            prer.text || ""
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, a.target);

          createBonusResult(
            a.bonus as number,
            a.modifierBonus as ModifierEnum,
            prer.text || "",
            trg
          );
        }
      });
    }
    if (bonusType === "damageBonus") {
      prer.damageBonus?.forEach((d) => {
        if (!d.target) {
          createBonusResult(
            d.bonus as number,
            d.modifierBonus as ModifierEnum,
            prer.text || ""
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, d.target);

          createBonusResult(
            d.bonus as number,
            d.modifierBonus as ModifierEnum,
            prer.text || "",
            trg
          );
        }
      });
    }
    if (bonusType === "armorClass") {
      prer.armorClass?.forEach((aR) => {
        if (!aR.target) {
          createBonusResult(
            aR.bonus as number,
            aR.modifierBonus as ModifierEnum,
            prer.text || ""
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, aR.target);

          createBonusResult(
            aR.bonus as number,
            aR.modifierBonus as ModifierEnum,
            prer.text || "",
            trg
          );
        }
      });
    }
    if (bonusType === "abilitys") {
      if (prer.abilitys) {
        const modifier = prer.abilitys.modifierBonus
          ? prer.abilitys.modifierBonus
          : null;
        Object.entries(prer.abilitys).forEach(([ab, value]) => {
          if (modifier) {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, modifier, ab);
          } else {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, { text: "increse" }, ab);
          }
        });
      }
    }
  });

  return allModifiers;
};
