import {
  addAbilitysModifiers,
  addTwoAbilitysModifiers
} from "../../Abilitys/Functions";
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
import { CountHitDicesFromAdj, CountHitDicesFromClassPc, createHitDiceMap } from "../../Vita/Functions";
import {
  AllModifiers,
  ModifiedCharacter,
  ModifierAbilityResult,
  ModifierResult
} from "../interface/ModifiedCharacter";
import { createPrerequisiteAbility } from "./CreatePrerequisiteAbility";
import { findAllPrerequisite } from "./FindAllPrerequisite";
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

  // const ability: Abilitys = newAbilitys ? newAbilitys : char.abilitys;
  const race: SubRace = newRace ? newRace : char.race;
  const archetypes: Archetype[] = newArchetypes ? newArchetypes : char.archetypes;
  const featsList: FeatPc[] = newFeatsList ? newFeatsList : char.featsList;
  const classPcList: ClassPc[] = newClasses ? newClasses : char.classPcList;
  const inventory: Inventory = newInventory ? newInventory : char.inventory;

  const allPrerequisite: Prerequisite[] = findAllPrerequisite(
    race, archetypes, featsList, classPcList, inventory
  );

  //Abilitys
  const ab: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "abilitys"
  );
  const totAB: Abilitys = addAbilitysModifiers(
    Object.values(ab).flatMap((a) => (a as ModifierAbilityResult).abilitys)
  );
  const abilitys: Abilitys = addTwoAbilitysModifiers(
    newAbilitys ? newAbilitys : char.abilitys,
    totAB
  );
  const allPrerequisiteWithAbilities = createPrerequisiteAbility(allPrerequisite, abilitys);
  //Abilitys
  //BaB
  const aR: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "attackRoll"
  );
  const reducedBabMod: number = Object.values(aR)
    .flatMap((a) => (a as ModifierResult).bonus)
    .reduce((tot, bab) => (tot += bab));
  const bab: number =
    char.classPcList.reduce(
      (tot, bab) => (tot += bab.level * bab.classCharacter.classBab),
      0
    ) + reducedBabMod;
  //BaB
  const dB: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "damageBonus"
  );
  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "savingThrow"
  );
  const sS: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "skillStudy"
  );
  const ac: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "armorClass"
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
    abilitys: abilitys,
    abilitysMod: ab,
    // abilitys
    // bab
    bab: bab,
    attackRollMod: aR,
    // bab
    damageBonusMod: dB,
    savingThrowMod: sT,
    skillStudyMod: sS,
    armorClassMod: ac,
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
