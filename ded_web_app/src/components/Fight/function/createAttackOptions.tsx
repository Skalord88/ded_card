import { ModifiedCharacter, WeaponElement } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { mapAllAttacksAreas } from "../../SummaryChar/component/SummaryCharAttacks";

export type AttackOptionsElement = {
  element: WeaponElement | undefined;
  area: string;
  show: boolean;
  selected?: boolean;
};

export const createAttackOptions = (
  char: ModifiedCharacter,
  optionAction?: string
): AttackOptionsElement[] => {
  if (!char) return [];
  if (optionAction === "Attack") {
    return mapAllAttacksAreas([
      char.attacks?.firstAttackSetOne || undefined,
      char.attacks?.secondAttackSetOne || undefined,
      char.attacks?.additionalAttackSetOne || undefined,
      char.attacks?.firstAttackSetTwo || undefined,
      char.attacks?.secondAttackSetTwo || undefined,
      char.attacks?.additionalAttackSetTwo || undefined
    ]);
  }
  return [];
};