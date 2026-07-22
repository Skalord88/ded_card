import { Item } from "../../interfaces";
import {
  EMPTY_BONUS,
  ModifierEnum,
  modifierEnumList
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { BonusResultMap, BonusSource } from "./GetBonusResult";
import { isToAdd } from "./ModifiedCharacter";

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  serch?: (string | number)[],
  consoleLog?: boolean
): TotAndBonusElement[] => {
  let list: TotAndBonusElement[] = [];

  Object.entries(map).forEach(([key, value]) => {
    if (consoleLog) {
      console.log("KEY:", key, "VALUES:", value);
      // console.log();
      // console.log("SEARCH:", serch);
    }

    if (!serch || serch.length <= 0) {
      const filtered: BonusSource[] = value.filter(
        (v: BonusSource) => !v.source
      );

      // Se il tipo di bonus non si somma, prendo solo il più alto
      // const valuesToUse: BonusSource[] = isToAdd(key)
      //   ? filtered
      //   : filtered.length > 0
      //     ? [
      //         filtered.reduce((max, curr) => {
      //           if(max.bonus <= 0 && curr.bonus <= 0) {return -curr.bonus < -max.bonus ? curr : max}
      //           else { return curr.bonus > max.bonus ? curr : max}
      //         })
      //       ]
      //     : [];

      const valuesToUse: BonusSource[] = isToAdd(key)
        ? filtered
        : filtered.length > 0
          ? filtered
          : [];

      valuesToUse.forEach((v: BonusSource) => {
        list.push(
          /// testo serve a ritornare la description (falso in abilita')
          testo
            ? {
                bonus: v.bonus,
                text: key,
                pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
                  ...EMPTY_BONUS,
                  description: key,
                  text: v.text
                }
              }
            : {
                bonus: v.bonus,
                text: undefined,
                pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
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
            if (consoleLog) {
              console.log(
                "SEARCH:",
                s,
                "SOURCE:",
                (v.source as ModifierEnum).text || (v.source as Item)?.id
              );
            }
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
