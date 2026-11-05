import { Abilitys, LevelAbilitys } from "../../Abilitys/Interface";
import { BonusResultMap } from "./GetBonusResult";

export type AbilityKey = keyof Omit<Abilitys, "modifierBonus">;

export const abilityKeys: AbilityKey[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
];

export const isAbilityKey = (key: string): key is AbilityKey =>
  abilityKeys.includes(key as AbilityKey);

export const addModdedAbilitysToAbilitys = (
  ability: Abilitys,
  // lvAbility?: LevelAbilitys[],
  newAb: BonusResultMap,
  consoleLog?: boolean
): Abilitys => {
  const resultLv: Abilitys = { ...ability };

  // if (lvAbility && lvAbility.length > 0) {
  //   lvAbility.forEach((lvAb) => {
  //     Object.entries(lvAb.abilitys).forEach(([key, value]) => {
  //       if (isAbilityKey(key) && resultLv[key] && value !== 0) {
  //         if (!abilityKeys.includes(key) || typeof value !== "number") return;
  //         const currentValue = resultLv[key];
  //         const newValue = currentValue + value;

  //         resultLv[key] = newValue;
  //       }
  //     });
  //   });
  // }

  // const returnResult: [Abilitys, Abilitys?] = [resultLv];

  // if(!newAb) return resultLv;

  // Aggiunge i bonus provenienti da newAb
  Object.values(newAb).forEach((bonusArray) => {
    bonusArray.forEach((bonusSource) => {
      const key = bonusSource.text as AbilityKey;

      if (!abilityKeys.includes(key)) return;

      const currentValue = resultLv[key];
      const newValue = currentValue + bonusSource.bonus;

      resultLv[key] = newValue;
    });
  });

  if (consoleLog) {
    console.log("Final result:", resultLv);
  }

  return resultLv;
};
