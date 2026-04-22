import { Item } from "../../interfaces";
import {
  modifierEnumList,
  EMPTY_BONUS,
  ModifierEnum
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../SummaryChar";
import { BonusResultMap, BonusSource } from "./GetBonusResult";

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  serch?: (string | number)[]
): TotAndBonusElement[] => {
  let list: TotAndBonusElement[] = [];
  Object.entries(map).map(([key, value]) => {
    if (!serch) {
      value.forEach((v: BonusSource) => {
        if (!v.source) {
          list.push(
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
          // console.log("list", list, "v", v, "key", key);
        }
      });
    }
    if (serch) {
      value.forEach((v) => {
        serch.forEach((s) => {
          // console.log("v", v, v.source)
          if (
            // v.source && (
            s === (v.source as Item)?.id ||
            s === (v.source as ModifierEnum)?.text
            // )
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
