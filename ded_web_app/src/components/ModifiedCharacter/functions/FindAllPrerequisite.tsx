import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { ClassFeats, FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, Inventory } from "../../interfaces";
import { RANK_VALUE } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { Archetype, SubRace } from "../../Race/Interfaces";
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

  if (race?.race) {
    race.race.modifiers && allPrerequisite.push(race.race.modifiers);

    race.size.modifiers && allPrerequisite.push(race.size.modifiers);

    race?.modifiers && allPrerequisite.push(race.modifiers);
  }

  if (archetypes) {
    archetypes.forEach((archetype) => {
      archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
    });
  }

  if (
    featsList &&
    featsList.length > 0 &&
    classPcList &&
    classPcList.length > 0
  ) {
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
    inventory.head &&
      inventory.head.modifiers !== null &&
      allPrerequisite.push(inventory.head.modifiers);
    inventory.neck &&
      inventory.neck.modifiers !== null &&
      allPrerequisite.push(inventory.neck.modifiers);
  }

  if (attacks) {
    Object.values(attacks).forEach((attack) => {
      if (attack)
        attack.modifiers !== null &&
          allPrerequisite.push(attack?.modifiers as Prerequisite);
    });
  }

  if (skills && skills.length > 0) {
    const charSkills: PrerequisiteSkills[] = skills.flatMap(
      (sk): PrerequisiteSkills[] => {
        if (!sk.skill && !sk.study) return [];

        if (sk.skill) {
          return [
            {
              skill: sk.skill,
              rank: sk.rank,
              modifierType: RANK_VALUE
            }
          ];
        }

        if (sk.study) {
          return [
            {
              rank: sk.rank,
              study: sk.study,
              modifierType: RANK_VALUE
            }
          ];
        }

        return [];
      }
    );

    allPrerequisite.push({
      id: -1,
      skillStudy: charSkills,
      text: "Pg skills"
    });
  }

  return allPrerequisite;
};
