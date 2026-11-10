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

// console.log("key", key, "applicable", applicable);
    const selected = chooseBestBonuses(applicable, key.toUpperCase());

    selected.forEach(bonus => {
      result.push({
        key,
        bonus
      });
    });

  });


  return result;
};