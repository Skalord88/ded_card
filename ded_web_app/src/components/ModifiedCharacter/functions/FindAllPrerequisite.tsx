import { CharacterPc } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

export const findAllPrerequisite = (char: CharacterPc): Prerequisite[] => {
  let allPrerequisite: Prerequisite[] = [];

  char.archetypes.forEach((archetype) => {
    archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
  });

  if (char.race) {
    char.race.race.modifiers !== null &&
      allPrerequisite.push(char.race.race.modifiers);

    char.race.size.modifiers !== null &&
      allPrerequisite.push(char.race.size.modifiers);

    char.race.modifiers !== null && allPrerequisite.push(char.race.modifiers);
  }
  if (char.featsList) {
    char.featsList.forEach((feat) => {
      feat.classFeat?.selected !== null &&
        allPrerequisite.push(feat.classFeat?.selected as Prerequisite);

      feat.feat?.modifiers !== null &&
        allPrerequisite.push(feat.feat?.modifiers as Prerequisite);
    });
  }

  if (char.inventory) {
    char.inventory.armor &&
      char.inventory.armor.modifiers !== null &&
      allPrerequisite.push(char.inventory.armor.modifiers);
    char.inventory.shield &&
      char.inventory.shield.modifiers !== null &&
      allPrerequisite.push(char.inventory.shield.modifiers);
  }

  return allPrerequisite;
};
