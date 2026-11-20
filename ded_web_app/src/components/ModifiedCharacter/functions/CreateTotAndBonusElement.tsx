import {
  EMPTY_BONUS,
  modifierEnumList,
  ModifierType
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { isToAdd } from "../Const/ModifiedCharacter";
import { BonusResultMap, BonusSource } from "./GetBonusResult";
import { resolveBonuses } from "./ResolvesBonuses";

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  search?: (string | number)[],
  consoleLog?: boolean
): TotAndBonusElement[] => {
  return resolveBonuses(map, search).map(
    ({ key, bonus }) =>
      ({
        bonus: bonus.bonus,
        text: testo ? key : undefined,
        pop: {
          name: key.toUpperCase() as ModifierType,
          description: key,
          text: bonus.text
        }
      }) as TotAndBonusElement
  );
};

export const chooseBestBonuses = (
  bonuses: BonusSource[],
  key: string,
  search?: (string | number)[]
): BonusSource[] => {
  if (isToAdd(key)) {
    return bonuses;
  }

  if (bonuses.length === 0) {
    return [];
  }

  // se ci sono bonus specifici per il contesto,
  // scartiamo quelli globali
  const specific = bonuses.filter((b) => b.targets && b.targets.length > 0);

  const candidates = specific.length > 0 ? specific : bonuses;

  return [
    candidates.reduce((best, current) => {
      // entrambi negativi:
      // scelgo quello più penalizzante per D&D
      if (best.bonus < 0 && current.bonus < 0) {
        return current.bonus < best.bonus ? current : best;
      }

      // uno positivo uno negativo:
      // deve vincere il modificatore specifico già filtrato sopra
      return current.bonus > best.bonus ? current : best;
    })
  ];
};

export const checkBonusTarget = (
  bonus: BonusSource,
  search: (string | number)[]
): boolean => {
  if (!bonus.targets || bonus.targets.length === 0) {
    return true;
  }

  const hasItemTarget = bonus.targets.some(
    (t) => typeof t !== "string" && "id" in t
  );

  if (hasItemTarget) {
    // oggetto + tipo attacco
    // devono essere presenti entrambi
    return bonus.targets.every((t) =>
      search.some(
        (s) => ("id" in t && t.id === s) || ("name" in t && t.name === s)
      )
    );
  }

  // Grapple, Melee, Ranged, ecc.
  // if(!bonus.targets) return false;
  return bonus.targets.some((t) => search.some((s) => t.name === s));
};
