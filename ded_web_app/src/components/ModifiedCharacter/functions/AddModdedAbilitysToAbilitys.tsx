import { Abilitys } from "../../Abilitys/Interface";
import { BonusResultMap } from "./GetBonusResult";

export const addModdedAbilitysToAbilitys = (
  ability: Abilitys,
  newAb: BonusResultMap
): Abilitys => {
  // copia per evitare mutazioni
  const result: Abilitys = { ...ability };

  // scorri tutte le chiavi del BonusResultMap (es. "Increase")
  Object.values(newAb).forEach((bonusArray) => {
    bonusArray.forEach((bonusSource) => {
      const key = bonusSource.text as keyof Abilitys;

      // controlla che sia una ability valida
      if (key in result && typeof result[key] === "number") {
        (result[key] as number) += bonusSource.bonus;
        // console.log("result[key]", key, result[key])
      }
    });
  });

  return result;
};
