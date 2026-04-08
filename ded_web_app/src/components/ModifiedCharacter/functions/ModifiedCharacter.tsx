import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import { CharacterPc, Inventory } from "../../interfaces";
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
import { findAllPrerequisite } from "./FindAllPrerequisite";
import { getBonusResult } from "./GetBonusResult";
import { modifiersFromPrerequisite } from "./ModifiersFromPrerequisite";

export const modifiedCharacter = (
  char: CharacterPc,
  newAbilitys?: Abilitys,
  newRace?: SubRace,
  newArchetypes?: Archetype[],
  newFeatsList?: FeatPc[],
  newClasses?: ClassPc[],
  newInventory?: Inventory
): ModifiedCharacter => {
  const ability: Abilitys = newAbilitys ?? char.abilitys;
  const race: SubRace = newRace ?? char.race;
  const archetypes: Archetype[] = newArchetypes
    ?? char.archetypes;
  const featsList: FeatPc[] = newFeatsList ?? char.featsList;
  const classPcList: ClassPc[] = newClasses ?? char.classPcList;
  const inventory: Inventory = newInventory ?? char.inventory;

  const allPrerequisite: Prerequisite[] = findAllPrerequisite(
    race,
    archetypes,
    featsList,
    classPcList,
    inventory
  );

  const newAb = getBonusResult(allPrerequisite, "abilitys");

  console.log("newAb", newAb);

  const newAbility = addModdedAbilitysToAbilitys(ability, newAb)

  console.log("newAbility", newAbility)

  const allPrerequisiteWithAbilities = createPrerequisiteAbility(
    allPrerequisite,
    newAbility
  );

  const newAr = getBonusResult(allPrerequisiteWithAbilities, "attackRoll");

  // console.log("newAr", newAr);
  const newDb = getBonusResult(allPrerequisiteWithAbilities, "damageBonus");

  // console.log("newDb", newDb);
  const newAc = getBonusResult(allPrerequisiteWithAbilities, "armorClass");

  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "savingThrow"
  );
  const sS: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
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

  return {
    title: title,
    // abilitys
    abilitys: newAbility,
    abilitysMod: newAb,
    // abilitys
    // bab
    bab: 0,
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
    listHitDices: listHitDices
  };
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
