import { Abilitys } from "../../Abilitys/Interface";
import { BonusResultMap } from "./GetBonusResult";

export const addModdedAbilitysToAbilitys = (
  ability: Abilitys,
  newAb: BonusResultMap
): Abilitys => {
  
  const result: Abilitys = { ...ability };

  Object.values(newAb).forEach((bonusArray) => {
    bonusArray.forEach((bonusSource) => {
      const key = bonusSource.text as keyof Abilitys;

      // controlla che sia una ability valida
      if (key in result && typeof result[key] === "number") {
        (result[key] as number) += bonusSource.bonus;
      }
    });
  });

  return result;
};
