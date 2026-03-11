import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { CharacterPc } from "../../interfaces";
import { SavingThrow } from "../../Saving/interface";
import { Prerequisite } from "../interface/Prerequisite";

export type AllModifiers = {
  [modifier: string]: (
    | Abilitys
    | AttackRoll
    | SavingThrow
    | ArmorClass
    | DamageBonus
  )[];
};

export type ModifiedCharacter = {
  abilitys: AllModifiers;
  attackRoll: AllModifiers;
  savingThrow: AllModifiers;
  armorClass: AllModifiers;
  damageBonus: AllModifiers;
};

export const findAllPrerequisite = (char: CharacterPc): Prerequisite[] => {
  const allPrerequisite: Prerequisite[] = [];

  char.archetypes.forEach((archetype) => {
    archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
  });

  char.race.race.modifiers !== null &&
    allPrerequisite.push(char.race.race.modifiers);

  char.race.modifiers !== null &&
    char.race.modifiers !== null &&
    allPrerequisite.push(char.race.modifiers);

  char.featsList.forEach((feat) => {
    feat.classFeat?.selected !== null &&
      allPrerequisite.push(feat.classFeat?.selected as Prerequisite);

    feat.feat?.modifiers !== null &&
      allPrerequisite.push(feat.feat?.modifiers as Prerequisite);
  });

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

export const modifiersFromPrerequisite = (
  allPrerequisite: Prerequisite[],
  type: string
): AllModifiers => {
  const modifiers: AllModifiers = {};

  allPrerequisite.forEach((prerequisite) => {
    if (type === "abilitys" && prerequisite.abilitys) {
      prerequisite.abilitys.forEach((ability) => {
        if (ability.modifierBonus?.text === null) {
          modifiers["null"] = [];
          modifiers["null"].push(ability);
        }

        if (ability.modifierBonus?.text) {
          modifiers[ability.modifierBonus?.text] = [];
          modifiers[ability.modifierBonus?.text].push(ability);
        }
      });
      return modifiers;
    }
    if (type === "armorClass" && prerequisite.armorClass) {
      prerequisite.armorClass.forEach((armor) => {
        if (armor.modifierBonus?.text === null) {
          modifiers["null"] = [];
          modifiers["null"].push(armor);
        }

        if (armor.modifierBonus?.text) {
          modifiers[armor.modifierBonus?.text] = [];
          modifiers[armor.modifierBonus?.text].push(armor);
        }
      });
      return modifiers;
    }
  });
  return modifiers;
};

export const modifiedCharacter = (char: CharacterPc): ModifiedCharacter => {
  const allPrerequisite: Prerequisite[] = findAllPrerequisite(char);

  const ab: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "abilitys"
  );
  const ac: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "armorClass"
  );

  console.log("allPrerequisite", allPrerequisite);
  console.log("ab", ab);
  console.log("ac", ac);

  return {
    abilitys: ab,
    attackRoll: {},
    savingThrow: {},
    armorClass: ac,
    damageBonus: {}
  };
};
