import { Item } from "../../interfaces";
import {
    EMPTY_BONUS,
    ModifierEnum,
    modifierEnumList
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../../SummaryChar/SummaryChar";
import { BonusResultMap, BonusSource } from "./GetBonusResult";
import { isToAdd } from "./ModifiedCharacter";

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  serch?: (string | number)[]
): TotAndBonusElement[] => {
  let list: TotAndBonusElement[] = [];

  Object.entries(map).forEach(([key, value]) => {
    if (!serch) {
      const filtered = value.filter((v: BonusSource) => !v.source);

      // Se il tipo di bonus non si somma, prendo solo il più alto
      const valuesToUse = isToAdd(key)
        ? filtered
        : filtered.length > 0
        ? [
            filtered.reduce((max, curr) =>
              curr.bonus > max.bonus ? curr : max
            )
          ]
        : [];

      valuesToUse.forEach((v: BonusSource) => {
        list.push(
          testo
            ? {
                bonus: v.bonus,
                text: key,
                pop:
                  modifierEnumList.filter((m) => m.text === v.text)[0] || {
                    ...EMPTY_BONUS,
                    description: key,
                    text: v.text
                  }
              }
            : {
                bonus: v.bonus,
                text: undefined,
                pop:
                  modifierEnumList.filter((m) => m.text === v.text)[0] || {
                    ...EMPTY_BONUS,
                    description: key,
                    text: v.text
                  }
              }
        );
      });
    }

    // NON toccato
    if (serch) {
      value.forEach((v) => {
        serch.forEach((s) => {
          if (
            s === (v.source as Item)?.id ||
            s === (v.source as ModifierEnum)?.text
          ) {
            list.push({
              bonus: v.bonus,
              text: key,
              pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
                ...EMPTY_BONUS,
                description: key,
                text: v.text
              }
            });
          }
        });
      });
    }
  });

  return list;
};
