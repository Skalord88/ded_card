import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";

export const showBabListByIndex = (
  listBabBonus: TotAndBonusElement[][][],
  hasTwoWeapons: boolean,
  counter: number,
  ranged: boolean,
  thrown: boolean,
  toThrown: boolean | undefined,
  weaponTwoHanded: boolean
): TotAndBonusElement[][] => {
  // console.log("toThrown", toThrown, "hasTwoWeapons", hasTwoWeapons)
  const oneMelee = listBabBonus[0] ?? [];
  const oneRanged = listBabBonus[1] ?? [];

  const oneMeleeTwo = listBabBonus[2] ?? [];
  const oneRangedTwo = listBabBonus[3] ?? [];

  // 2 armi
  if (hasTwoWeapons) {
    return ranged || toThrown ? oneRangedTwo : oneMeleeTwo;
  }

  // arma a due mani
  if (weaponTwoHanded) {
    return counter === 0
      ? [ranged ? oneRanged[0] : oneMelee[0]]
      : ranged
        ? oneRanged
        : oneMelee;
  }

  // da lancio
  if (toThrown !== undefined) {
    return counter === 0
      ? [toThrown ? oneRanged[0] : oneMelee[0]]
      : toThrown
        ? oneRanged
        : oneMelee;
  }

  // arma singola
  return counter === 0
    ? [ranged ? oneRanged[0] : oneMelee[0]]
    : ranged
      ? oneRanged
      : oneMelee;
};