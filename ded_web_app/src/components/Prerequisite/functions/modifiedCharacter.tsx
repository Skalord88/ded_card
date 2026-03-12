import {
  addAbilitysModifiers,
  addBonusInAttackRoll,
  maxAbilitysModifiers
} from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { CharacterPc } from "../../interfaces";
import { SavingThrow } from "../../Saving/interface";
import { Prerequisite } from "../interface/Prerequisite";

export type AllModifiers = {
  [modifier: string]:
    | Abilitys
    | (AttackRoll
    | SavingThrow
    | ArmorClass
    | DamageBonus)[];
};

export type ModifiedCharacter = {
  abilitys: AllModifiers;
  attackRoll: AllModifiers;
  damageBonus: AllModifiers;
  savingThrow: AllModifiers;
  armorClass: AllModifiers;
};

export const findAllPrerequisite = (char: CharacterPc): Prerequisite[] => {
  const allPrerequisite: Prerequisite[] = [];

  char.archetypes.forEach((archetype) => {
    archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
  });

  if (char.race) {
    char.race.race.modifiers !== null &&
      allPrerequisite.push(char.race.race.modifiers);

    char.race.size.modifiers !== null &&
      allPrerequisite.push(char.race.size.modifiers);

    char.race.modifiers !== null &&
      char.race.modifiers !== null &&
      allPrerequisite.push(char.race.modifiers);
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

export const modifiersFromPrerequisite = (
  allPrerequisite: Prerequisite[],
  type: string
): AllModifiers => {
  let modifiers: AllModifiers = {};

  allPrerequisite.forEach((prerequisite) => {
    if (type === "abilitys" && prerequisite.abilitys) {
      const newModList: { [modifier: string]: Abilitys[] } = {};
      if (prerequisite.abilitys.modifierBonus === null) {
        newModList["null"] = [];
        newModList["null"].push(prerequisite.abilitys);
        modifiers["null"] = addAbilitysModifiers(
          newModList["null"] as Abilitys[]
        );
      }

      if (prerequisite.abilitys.modifierBonus?.text) {
        newModList[prerequisite.abilitys.modifierBonus?.text] = [];
        newModList[prerequisite.abilitys.modifierBonus?.text].push(
          prerequisite.abilitys
        );
        modifiers[prerequisite.abilitys.modifierBonus?.text] =
          maxAbilitysModifiers(
            newModList[prerequisite.abilitys.modifierBonus?.text] as Abilitys[]
          );
      }
      return modifiers;
    }

    if (type === "attackRoll" && prerequisite.attackRoll) {
      const newModList: { [modifier: string]: AttackRoll[] } = {};
    prerequisite.attackRoll.forEach((attack) => {
        if (attack.modifierBonus !== null) {
          if (attack.modifierBonus?.text === null) {
            newModList["null"] = [];
            newModList["null"].push(attack);
            modifiers["null"] = addBonusInAttackRoll(newModList["null"]);
          }

          if (attack.modifierBonus?.text) {
            newModList[attack.modifierBonus?.text] = [];
            newModList[attack.modifierBonus?.text].push(attack);
            modifiers[attack.modifierBonus?.text] = addBonusInAttackRoll(
              newModList[attack.modifierBonus?.text]
            );
          }
        }
      });
      return modifiers;
    }

    // if (type === "damageBonus" && prerequisite.damageBonus) {
    //   prerequisite.damageBonus.forEach((damage) => {
    //     if (damage.modifierBonus !== null) {
    //       if (damage.modifierBonus?.text === null) {
    //         const newModList: { [modifier: string]: DamageBonus[] } = {};
    //         newModList["null"] = [];
    //         newModList["null"].push(damage);
    //         modifiers["null"] = addBonusInModifiers(newModList["null"]);
    //       }

    //       if (damage.modifierBonus?.text) {
    //         const newModList: { [modifier: string]: DamageBonus[] } = {};
    //         newModList[damage.modifierBonus?.text] = [];
    //         newModList[damage.modifierBonus?.text].push(damage);

    //         modifiers[damage.modifierBonus?.text] = addBonusInModifiers(
    //           newModList[damage.modifierBonus?.text]
    //         );
    //       }
    //     }
    //     return modifiers;
    //   });
      //   if (type === "savingThrow" && prerequisite.savingThrow) {
      //     prerequisite.savingThrow.forEach((savingThrow) => {
      //       if (savingThrow.modifierBonus !== null) {
      //         if (savingThrow.modifierBonus?.text === null) {
      //           modifiers["null"] = [];
      //           modifiers["null"].push(savingThrow);
      //         }

      //         if (savingThrow.modifierBonus?.text) {
      //           modifiers[savingThrow.modifierBonus?.text] = [];
      //           modifiers[savingThrow.modifierBonus?.text].push(savingThrow);
      //         }
      //       }
      //     });
      //     return modifiers;
      //   }

      //   if (type === "armorClass" && prerequisite.armorClass) {
      //     prerequisite.armorClass.forEach((armor) => {
      //       if (armor.modifierBonus?.text === null) {
      //         modifiers["null"] = [];
      //         modifiers["null"].push(armor);
      //       }

      //       if (armor.modifierBonus?.text) {
      //         modifiers[armor.modifierBonus?.text] = [];
      //         modifiers[armor.modifierBonus?.text].push(armor);
      //       }
      //     });
      //     return modifiers;
    // }
  });
  return modifiers;
};

export const modifiedCharacter = (char: CharacterPc): ModifiedCharacter => {
  const allPrerequisite: Prerequisite[] = findAllPrerequisite(char);

  console.log("allPrerequisite", allPrerequisite);

  const ab: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "abilitys"
  );
  const aR: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "attackRoll"
  );
  const dB: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "damageBonus"
  );
  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "savingThrow"
  );
  const ac: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "armorClass"
  );

  console.log("abilitys", ab);
  console.log("attackRoll", aR);
  console.log("damageBonus", dB);
  console.log("savingThrow", sT);
  console.log("armorClass", ac);

  return {
    abilitys: ab,
    attackRoll: aR,
    damageBonus: dB,
    savingThrow: sT,
    armorClass: ac
  };
};
