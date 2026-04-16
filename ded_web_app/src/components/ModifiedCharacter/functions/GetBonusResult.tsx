import { Item, ModifierBonus, Weapon } from "../../interfaces";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { AllModifiers, BonusResult } from "../interface/ModifiedCharacter";

export type TargetBonus = ModifierEnum | Item;

export type BonusSource = {
  bonus: number;
  text: string;
  source?: ModifierEnum | Item;
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
    // console.log("modifier", modifier.text)
    // if (bonus === 0) return;
    const key: string = modifier? modifier.text : "Increase"
    // console.log("key", key)
    if (!allModifiers[key] && bonus !== 0) {
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
        // const key = a.modifierBonus
        if (!a.target) {
          
          createBonusResult(
            a.bonus as number,
            prer.text || "",
            a.modifierBonus as ModifierEnum
            // a.modifierBonus as ModifierEnum || null,
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, a.target);

          createBonusResult(
            a.bonus as number,
            prer.text || "",
            a.modifierBonus as ModifierEnum || null,
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
            prer.text || "",
            d.modifierBonus as ModifierEnum || null,
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, d.target);

          createBonusResult(
            d.bonus as number,
            prer.text || "",
            d.modifierBonus as ModifierEnum || null,
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
            prer.text || "",
            aR.modifierBonus as ModifierEnum || null,
          );
        } else {
          const trg: (ModifierEnum | Item)[] = createTargets(prer, aR.target);

          createBonusResult(
            aR.bonus as number,
            prer.text || "",
            aR.modifierBonus as ModifierEnum || null,
            trg
          );
        }
      });
    }
    if (bonusType === "abilitys") {
      if (prer.abilitys) {
        const modifier = prer.abilitys.modifierBonus
        Object.entries(prer.abilitys).forEach(([ab, value]) => {
          if (modifier) {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, ab, modifier );
          } else {
            if (value !== 0 && (value as number))
              createBonusResult(value as number, ab, { text: "Increase" } );
          }
        });
      }
    }
  });

  return allModifiers;
};
