import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { Proficency } from "../interface/ModifiedCharacter";

export const createCompetenceFromPrerequisites = (
  prerequisites: Prerequisite[]
): Proficency => {
  const charCompetence: Proficency = {
    armors: [],
    weapons: []
  };

  const addUnique = (
    list: Proficency["armors"],
    value: Proficency["armors"][number]
  ) => {
    if (!list.includes(value)) {
      list.push(value);
    }
  };

  prerequisites.forEach((pre) => {
    if (pre?.armorType) {
      addUnique(charCompetence.armors, pre.armorType);
    }

    if (pre?.weaponType) {
      addUnique(charCompetence.weapons, pre.weaponType);
    }

    pre?.items?.forEach((item) => {
      if (typeof item.id !== "number") {
        return;
      }

      if (item.itemType === "ARMOR" || item.itemType === "SHIELD") {
        addUnique(charCompetence.armors, item.id);
      }

      if (item.itemType === "WEAPON") {
        addUnique(charCompetence.weapons, item.id);
      }
    });
  });

  return charCompetence;
};
