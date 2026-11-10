import { modifierEnumListToAdd, ModifierType } from "../../Prerequisite/interface/ModifierEnum";
import { BonusResultMap, BonusSource } from "./GetBonusResult";

export const isGlobalBonus = (b: BonusSource) =>
    !b.targets || b.targets.length === 0;

export const filterBonusMap = (
  map: BonusResultMap,
  predicate: (b: BonusSource) => boolean
): BonusResultMap =>
  Object.fromEntries(
    Object.entries(map)
      .map(([key, bonuses]) => [key, bonuses.filter(predicate)])
      .filter(([, bonuses]) => bonuses.length > 0)
  );

  export const isStacking = (key: ModifierType) => {
    if (key === "UNTYPED") return true;

    return modifierEnumListToAdd.includes(key);
};