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
  const ability: Abilitys = newAbilitys ? newAbilitys : char.abilitys;
  const race: SubRace = newRace ? newRace : char.race;
  const archetypes: Archetype[] = newArchetypes
    ? newArchetypes
    : char.archetypes;
  const featsList: FeatPc[] = newFeatsList ? newFeatsList : char.featsList;
  const classPcList: ClassPc[] = newClasses ? newClasses : char.classPcList;
  const inventory: Inventory = newInventory ? newInventory : char.inventory;

  const allPrerequisite: Prerequisite[] = findAllPrerequisite(
    race,
    archetypes,
    featsList,
    classPcList,
    inventory
  );

  const newAb = getBonusResult(allPrerequisite, "abilitys");

  console.log("newAb", newAb);

  const newAbility: Abilitys = {
    strength:
      ability.strength +
      (newAb["increse"].find((i) => i.text === "strength")?.bonus ?? 0),
    dexterity:
      ability.dexterity +
      (newAb["increse"].find((i) => i.text === "dexterity")?.bonus ?? 0),
    constitution:
      ability.constitution +
      (newAb["increse"].find((i) => i.text === "constitution")?.bonus ?? 0),
    intelligence:
      ability.intelligence +
      (newAb["increse"].find((i) => i.text === "intelligence")?.bonus ?? 0),
    wisdom:
      ability.wisdom +
      (newAb["increse"].find((i) => i.text === "wisdom")?.bonus ?? 0),
    charisma:
      ability.charisma +
      (newAb["increse"].find((i) => i.text === "charisma")?.bonus ?? 0)
  };

  const allPrerequisiteWithAbilities = createPrerequisiteAbility(
    allPrerequisite,
    newAbility
  );

  const newAr = getBonusResult(allPrerequisiteWithAbilities, "attackRoll");

  console.log("newAr", newAr);
  const newDb = getBonusResult(allPrerequisiteWithAbilities, "damageBonus");

  console.log("newDb", newDb);
  const newAc = getBonusResult(allPrerequisiteWithAbilities, "armorClass");

  console.log("newAc", newAc);

  //Abilitys
  // const ab: AllModifiers = modifiersFromPrerequisite(
  //   allPrerequisite,
  //   "abilitys"
  // );
  // const totAB: Abilitys = addAbilitysModifiers(
  //   Object.values(ab).flatMap((a) => (a as ModifierAbilityResult).abilitys)
  // );
  // const abilitys: Abilitys = addTwoAbilitysModifiers(
  //   newAbilitys ? newAbilitys : char.abilitys,
  //   totAB
  // );

  //Abilitys
  //BaB
  // const aR: AllModifiers = modifiersFromPrerequisite(
  //   allPrerequisiteWithAbilities,
  //   "attackRoll"
  // );
  // const reducedBabMod: number = Object.values(aR)
  //   .flatMap((a) => (a as ModifierResult).bonus)
  //   .reduce((tot, bab) => (tot += bab));
  // const bab: number =
  //   char.classPcList.reduce(
  //     (tot, bab) => (tot += bab.level * bab.classCharacter.classBab),
  //     0
  //   ) + reducedBabMod;
  //BaB
  // const dB: AllModifiers = modifiersFromPrerequisite(
  //   allPrerequisiteWithAbilities,
  //   "damageBonus"
  // );
  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "savingThrow"
  );
  const sS: AllModifiers = modifiersFromPrerequisite(
    allPrerequisiteWithAbilities,
    "skillStudy"
  );
  // const ac: AllModifiers = modifiersFromPrerequisite(
  //   allPrerequisiteWithAbilities,
  //   "armorClass"
  // );

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
    abilitys: ability,
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
