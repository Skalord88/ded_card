import {
  addAbilitysModifiers,
  addTwoAbilitysModifiers
} from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { CharacterPc } from "../../interfaces";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import {
  findAllAdjLevelInChar,
  findAllAdjLevelInRaceAndArchetypes
} from "../../Race/Function";
import { Archetype, SubRace } from "../../Race/Interfaces";
import {
  AllModifiers,
  ModifiedCharacter,
  ModifierAbilityResult,
  ModifierResult
} from "../interface/ModifiedCharacter";
import { findAllPrerequisite } from "./FindAllPrerequisite";
import { modifiersFromPrerequisite } from "./ModifiersFromPrerequisite";

export const modifiedCharacter = (
  char: CharacterPc,
  newAbilitys?: Abilitys,
  newRace?: SubRace,
  newArchetypes?: Archetype[],
  newClasses?: ClassPc[]
): ModifiedCharacter => {
  const allPrerequisite: Prerequisite[] = findAllPrerequisite(char);

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
  //Abilitys
  //BaB
  const aR: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
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
    allPrerequisite,
    "damageBonus"
  );
  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "savingThrow"
  );
  const sS: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "skillStudy"
  );
  const ac: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
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
    race: newRace ? newRace : char.race,
    archetypes: newArchetypes ? newArchetypes : char.archetypes,
    classPcList: newClasses ? newClasses : char.classPcList
  };
};
