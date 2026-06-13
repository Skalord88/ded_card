import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { ClassFeats, FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, CharacterPc, Inventory, Weapon } from "../../interfaces";
import {
  BASE_VALUE,
  EMPTY_BONUS,
  RANK_VALUE
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { SubRace, Archetype } from "../../Race/Interfaces";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { SkillCharacter } from "../../Skills/interface/SkillsInterface";

export const findAllPrerequisite = (
  race?: SubRace,
  archetypes?: Archetype[],
  featsList?: FeatPc[],
  classPcList?: ClassPc[],
  inventory?: Inventory,
  attacks?: Attacks,
  skills?: SkillCharacter[]
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

  if (attacks) {
    Object.values(attacks).forEach((attack) => {
      if (attack)
        attack.modifiers !== null &&
          allPrerequisite.push(attack?.modifiers as Prerequisite);
    });
  }

  if (skills) {
    let charSkills: PrerequisiteSkills[] = skills.map((sk) => {
      return {
        skill: sk.skill ?? undefined,
        study: sk.study ?? undefined,
        rank: sk.rank,
        modifierBonus: RANK_VALUE
      };
    });
    allPrerequisite.push({ id: -1, skillStudy: charSkills, text: "Pg skills" });
  }

  return allPrerequisite;
};
