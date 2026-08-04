import { ABILITY_MODIFIER, DEFLECTION_BONUS } from "../../Prerequisite/interface/ModifierEnum";
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

  export const isStacking = (key: string) => {
    if (key === "__UNTYPED__") return true;

    return [
        ABILITY_MODIFIER.text,
        DEFLECTION_BONUS.text
    ].includes(key);
};