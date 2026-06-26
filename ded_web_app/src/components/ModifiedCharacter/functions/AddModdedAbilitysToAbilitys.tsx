import { Abilitys } from "../../Abilitys/Interface";
import { BonusResultMap } from "./GetBonusResult";

type AbilityKey = keyof Omit<Abilitys, "modifierBonus">;

const abilityKeys: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export const addModdedAbilitysToAbilitys = (
  ability: Abilitys,
  newAb: BonusResultMap,
  consoleLog?: boolean
): Abilitys => {
  const result: Abilitys = { ...ability };

  Object.values(newAb).forEach((bonusArray) => {
    bonusArray.forEach((bonusSource) => {
      const key = bonusSource.text as AbilityKey;

      if (!abilityKeys.includes(key)) return;

      const currentValue = result[key];
      const newValue = currentValue + bonusSource.bonus;

      if (consoleLog) {
        console.log(key, currentValue, newValue);
      }

      result[key] = newValue;
    });
  });

  return result;
};
