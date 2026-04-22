import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { ClassFeats, FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, CharacterPc, Inventory, Weapon } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { SubRace, Archetype } from "../../Race/Interfaces";

export const findAllPrerequisite = (
  race?: SubRace,
  archetypes?: Archetype[],
  featsList?: FeatPc[],
  classPcList?: ClassPc[],
  inventory?: Inventory,
  attacks?: Attacks
): Prerequisite[] => {
  let allPrerequisite: Prerequisite[] = [];

  if (race) {
    race.race.modifiers !== null && allPrerequisite.push(race.race.modifiers);

    race.size.modifiers !== null && allPrerequisite.push(race.size.modifiers);

    race.modifiers !== null && allPrerequisite.push(race.modifiers);
  }

  if (archetypes) {
    archetypes.forEach((archetype) => {
      archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
    });
  }

  if (featsList && classPcList) {
    const allFeatPc: (FeatPc | ClassFeats)[] = [
      ...classPcList.flatMap((c) => c.classCharacter.classFeats),
      ...featsList
    ];
    allFeatPc.forEach((feat) => {
      "selected" in feat &&
        feat.selected !== null &&
        allPrerequisite.push(feat.selected as Prerequisite);

      feat.feat?.modifiers !== null &&
        allPrerequisite.push(feat.feat?.modifiers as Prerequisite);
    });
  }

  if (inventory) {
    inventory.armor &&
      inventory.armor.modifiers !== null &&
      allPrerequisite.push(inventory.armor.modifiers);
    inventory.shield &&
      inventory.shield.modifiers !== null &&
      allPrerequisite.push(inventory.shield.modifiers);
  }

  if(attacks) {
    Object.values(attacks).forEach(attack => {
      if(attack) attack.modifiers !== null && allPrerequisite.push(attack?.modifiers as Prerequisite);
      })
  }

  return allPrerequisite;
};
