import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, CharacterPc, Inventory } from "../../interfaces";
import {
  ABILITY_MODIFIER,
  DEFLECTION_BONUS
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import {
  findAllAdjLevelInChar,
  findAllAdjLevelInRaceAndArchetypes
} from "../../Race/Function";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { createHitDiceMap } from "../../Vita/Functions";
import {
  AllModifiers,
  ModifiedCharacter
} from "../interface/ModifiedCharacter";
import { addModdedAbilitysToAbilitys } from "./AddModdedAbilitysToAbilitys";
import { createPrerequisiteAbility } from "./CreatePrerequisiteAbility";
import { createPrerequisiteFromClasses } from "./CreatePrerequisiteFromClasses";
import { findAllPrerequisite } from "./FindAllPrerequisite";
import { BonusResultMap, getBonusResult, prerequisiteToTotAndBonusList } from "./GetBonusResult";
import { modifiersFromPrerequisite } from "./ModifiersFromPrerequisite";

export const modifiedCharacter = (
  char: CharacterPc,
  newAbilitys?: Abilitys,
  newRace?: SubRace,
  newArchetypes?: Archetype[],
  newFeatsList?: FeatPc[],
  newClasses?: ClassPc[],
  newInventory?: Inventory,
  newAttacks?: Attacks
): ModifiedCharacter => {
  const ability: Abilitys = newAbilitys ?? char.abilitys;
  const race: SubRace = newRace ?? char.race;
  const archetypes: Archetype[] = newArchetypes ?? char.archetypes;
  const featsList: FeatPc[] = newFeatsList ?? char.featsList;
  const classPcList: ClassPc[] = newClasses ?? char.classPcList;
  const inventory: Inventory = newInventory ?? char.inventory;
  const attacks: Attacks = newAttacks ?? char.attacks;

  const allPrerequisite: Prerequisite[] = findAllPrerequisite(
    race,
    archetypes,
    featsList,
    classPcList,
    inventory
  );

  const newAb: BonusResultMap = getBonusResult(allPrerequisite, "abilitys");

  // console.log("newAb", newAb);

  const newAbility: Abilitys = addModdedAbilitysToAbilitys(ability, newAb);

  // console.log("newAbility", newAbility)

  const allPrerequisiteWithAbilities: Prerequisite[] =
    createPrerequisiteAbility(allPrerequisite, newAbility);
  // console.log("allPrerequisiteWithAbilities", allPrerequisiteWithAbilities)
  const allPrerequisiteFromClasses: Prerequisite[] =
    createPrerequisiteFromClasses(allPrerequisiteWithAbilities, classPcList);

  // console.log("allPrerequisiteFromClasses", allPrerequisiteFromClasses)

  const totNewAr = prerequisiteToTotAndBonusList(allPrerequisiteFromClasses,
    "attackRoll")

    // console.log("totNewAr", totNewAr)

  const newAr: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "attackRoll"
  );

  // console.log("newAr", newAr);
  const newDb: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "damageBonus"
  );

  // console.log("newDb", newDb);
  const newAc: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "armorClass"
  );

  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteFromClasses,
    "savingThrow"
  );
  const sS: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteFromClasses,
    "skillStudy"
  );

  const adjLevel: number =
    !newRace && !newArchetypes
      ? findAllAdjLevelInChar(char)
      : findAllAdjLevelInRaceAndArchetypes(
          char.race.levelAdjustment,
          char.archetypes
        );
  const totLevel: number = getTotalClassLevel(
    newClasses ? newClasses : char.classPcList
  );

  const title: string =
    char.race.subRacesName + ", lv." + (adjLevel + totLevel);

  const listHitDices = createHitDiceMap(adjLevel, classPcList);

  // console.log("bab", newAr, returnBab(newAr))

  return {
    title: title,
    // abilitys
    abilitys: newAbility,
    abilitysMod: newAb,
    // abilitys
    // bab
    bab: Math.floor(returnBab(newAr)),
    attackRollMod: newAr,
    // bab
    damageBonusMod: newDb,
    savingThrowMod: sT,
    skillStudyMod: sS,
    armorClassMod: newAc,
    adjLevel: adjLevel,
    totLevel: totLevel,
    race: race,
    archetypes: archetypes,
    classPcList: classPcList,
    listHitDices: listHitDices,
    inventory: inventory,
    attacks: attacks
  };
};

export const isToAdd = (key: string): boolean => {
  return [ABILITY_MODIFIER.text, DEFLECTION_BONUS.text].includes(key);
};

export const returnBab = (ar: BonusResultMap): number => {
  let tot: number = 0;
  Object.keys(ar).forEach((key) => {
    if (isToAdd(key)) {
      ar[key].forEach((a) => (tot += !a.source ? a.bonus : 0));
    } else {
      ar[key].forEach((a) => (tot = !a.source ? a.bonus : tot));
    }
  });
  return tot;
};

// console.log("allPrerequisite", allPrerequisite);
// allPrerequisite.forEach((pre) => {
//   if (pre){
//     Object.entries(pre).forEach(([key, value]) => {
//       if(value && key !== "id"){
//         console.log("id." + pre.id + ",", pre.text, key && key, value && value);
//       }
//     });
//   }
// });
