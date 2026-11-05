import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";

export const showDmgListByIndex = (
  listBabBonus: TotAndBonusElement[][],
  hasOffHand: boolean,
  counter: number, // 0 o 1 || 0,1,2,3
  ranged: boolean,
  thrown: boolean,
  toThrown: boolean | undefined,
  weaponTwoHanded: boolean
): TotAndBonusElement[] => {
  const oneMelee = listBabBonus[0] ?? [];
  const oneRanged = listBabBonus[1] ?? [];

  const oneMeleeTwo = listBabBonus[2] ?? [];
  const oneRangedTwo = listBabBonus[3] ?? [];

  // console.log([oneMelee, oneRanged, oneMeleeTwo, oneRangedTwo]);

  if (toThrown !== undefined) {
    // if(!hasOffHand){
    return !toThrown ? oneMelee : oneRanged;
    // }
  }

  if (hasOffHand) {
    return !ranged ? oneMeleeTwo : oneRangedTwo;
  }

  return !ranged ? oneMelee : oneRanged;
};
