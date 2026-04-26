import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  Attacks,
  CharacterPc,
  Inventory,
  Item,
  Weapon
} from "../../interfaces";
import {
  ABILITY_MODIFIER,
  BASE_VALUE,
  DEFLECTION_BONUS,
  ENCHANTMENT_BONUS,
  ModifierEnum
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import {
  findAllAdjLevelInChar,
  findAllAdjLevelInRaceAndArchetypes
} from "../../Race/Function";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { noneWeapon } from "../../variables";
import { createHitDiceMap } from "../../Vita/Functions";
import {
  AllModifiers,
  AttackElement,
  ModifiedCharacter,
  WeaponElement
} from "../interface/ModifiedCharacter";
import { TotAndBonusElement } from "../SummaryChar";
import { addModdedAbilitysToAbilitys } from "./AddModdedAbilitysToAbilitys";
import { createPrerequisiteAbility } from "./CreatePrerequisiteAbility";
import { createPrerequisiteFromClasses } from "./CreatePrerequisiteFromClasses";
import { createTotAndBonusElement } from "./CreateTotAndBonusElement";
import { findAllPrerequisite } from "./FindAllPrerequisite";
import { BonusResultMap, BonusSource, getBonusResult } from "./GetBonusResult";
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
    inventory,
    attacks
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

  // const totNewAr = prerequisiteToTotAndBonusList(allPrerequisiteFromClasses,
  //   "attackRoll")

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

  const toListArmorClass: TotAndBonusElement[] = [
    { bonus: 10, pop: BASE_VALUE }
  ].concat(createTotAndBonusElement(newAc || {}, true));

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

  const bab: number = returnBonus(newAr);

  // console.log("newAr", newAr);

  const toListBab: TotAndBonusElement[] = createTotAndBonusElement(
    newAr || {},
    true
  );

  console.log("toListBab", toListBab);

  const toListMeleeAttack: TotAndBonusElement[] = createTotAndBonusElement(
    newAr || {},
    true,
    ["Melee"]
  );

  const toListRangedAttack: TotAndBonusElement[] = createTotAndBonusElement(
    newAr || {},
    true,
    ["Ranged"]
  );

  const babMelee: number = returnBonusSpecific(newAr, ["Melee"]);

  const babRanged: number = returnBonusSpecific(newAr, ["Ranged"]);

  const listOfWeapons = [
    attacks?.firstAttackSetOne || noneWeapon,
    attacks?.firstAttackSetTwo || noneWeapon,

    attacks?.secondAttackSetOne || noneWeapon,
    attacks?.secondAttackSetTwo || noneWeapon,

    attacks?.additionalAttackSetOne || noneWeapon,
    attacks?.additionalAttackSetTwo || noneWeapon
  ];
  const firstMeleeWeapon: Weapon =
    listOfWeapons.find((w) => !w?.type.includes("RANGED")) || noneWeapon;
  const firstRangedWeapon: Weapon | undefined = listOfWeapons.find((w) =>
    w?.type.includes("RANGED")
  );

  const weaponEnchantmentBonus = (weapon: Weapon): TotAndBonusElement[] => {
    const enchantments: TotAndBonusElement[] = [];
    if(firstMeleeWeapon?.enchantmentBonus) enchantments.push(
      {
    bonus: weapon.enchantmentBonus || 0,
    text: weapon.weaponName,
    pop: ENCHANTMENT_BONUS as ModifierEnum
}
    );
    return enchantments;
  }

  const createWeaponElement = (
    weapon: Weapon | undefined,
    ranged: boolean,
    text: boolean
  ): WeaponElement => {
    if (!weapon) return {};
    return {
      weaponMelee: !ranged ? weapon : undefined,
      weaponRanged: ranged ? weapon : undefined,
      toListMeleeAttack:
        !ranged
          ? createTotAndBonusElement(newAr || {}, text, ["Melee", weapon.itemId]).concat(weaponEnchantmentBonus(weapon))
          : undefined,
      toListMeleeDamage:
        !ranged
          ? createTotAndBonusElement(newDb || {}, text, ["Melee", weapon.itemId]).concat(weaponEnchantmentBonus(weapon))
          : undefined,
      toListRangedAttack:
        ranged
          ? createTotAndBonusElement(newAr || {}, text, ["Ranged", weapon.itemId]).concat(weaponEnchantmentBonus(weapon))
          : undefined,
      toListRangedDamage:
        ranged
          ? createTotAndBonusElement(newDb || {}, text, ["Ranged", weapon.itemId]).concat(weaponEnchantmentBonus(weapon))
          : undefined,
      babMelee:
        !ranged
          ? returnBonusSpecific(newAr, ["Melee", weapon.itemId])
           + (weapon.enchantmentBonus || 0)
          : undefined,
      babRanged:
        ranged
          ? returnBonusSpecific(newAr, ["Ranged", weapon.itemId]) + (weapon.enchantmentBonus || 0)
          : undefined,
      damageMelee:
        !ranged
          ? returnBonusSpecific(newDb, ["Melee", weapon.itemId]) + (weapon.enchantmentBonus || 0)
          : undefined,
      damageRanged:
        ranged
          ? returnBonusSpecific(newDb, ["Ranged", weapon.itemId]) + (weapon.enchantmentBonus || 0)
          : undefined
    };
  };

  const firstMelee: WeaponElement = createWeaponElement(
    firstMeleeWeapon,
    false,
    true
  );
  const firstRanged: WeaponElement | undefined = firstRangedWeapon
    ? createWeaponElement(firstRangedWeapon, true, true)
    : undefined;

  const newAttacksElement: AttackElement = {
    listOfWeapons: listOfWeapons,
    bab: bab,
    toListBab: toListBab,
    toListMeleeAttack: toListMeleeAttack,
    toListRangedAttack: toListRangedAttack,
    babMelee: babMelee,
    babRanged: babRanged,
    firstMelee: firstMelee,
    firstRanged: firstRanged,
    firstAttackSetOne: attacks?.firstAttackSetOne
      ? createWeaponElement(
          attacks.firstAttackSetOne,
          attacks.firstAttackSetOne.type.includes("RANGED"),
          false
        )
      : undefined
  };

  return {
    title: title,
    abilitys: newAbility,
    abilitysMod: newAb,
    attackRollMod: newAr,
    damageBonusMod: newDb,
    savingThrowMod: sT,
    skillStudyMod: sS,
    armorClassMod: newAc,
    toListArmorClass: toListArmorClass,
    adjLevel: adjLevel,
    totLevel: totLevel,
    race: race,
    archetypes: archetypes,
    classPcList: classPcList,
    listHitDices: listHitDices,
    inventory: inventory,
    attacks: newAttacksElement
  };
};

export const isToAdd = (key: string): boolean => {
  return [ABILITY_MODIFIER.text, DEFLECTION_BONUS.text].includes(key);
};

// export const ifToAddSum = (check: boolean, tot: number, bonus: number): number => {
//   if(check) return tot + bonus;
//   return tot > bonus ? tot : bonus;
// }

export const returnBonus = (ar: BonusResultMap): number => {
  return Object.keys(ar).reduce((globalTot, key) => {
    const bonuses = ar[key]
      .filter((a: BonusSource) => !a.source)
      .map((a: BonusSource) => a.bonus);

    if (isToAdd(key)) {
      // somma tutto
      return globalTot + bonuses.reduce((sum, b) => sum + b, 0);
    }
    // console.log("key", Math.max(0, ...bonuses), "bonuses", bonuses);
    // prende solo il bonus più alto
    return globalTot + Math.max(0, ...bonuses);
  }, 0);
};
export const returnBonusSpecific = (
  ar: BonusResultMap,
  serch: (string | number)[] = []
): number => {
  return Object.keys(ar).reduce((tot, key) => {
    return (
      tot +
      ar[key].reduce((tot, a: BonusSource) => {
        const match = serch.some(
          (s) =>
            (a.source as ModifierEnum)?.text === s ||
            (a.source as Item)?.id === s
        );
        return match
          ? isToAdd(key)
            ? tot + a.bonus
            : tot > a.bonus
            ? tot
            : a.bonus
          : tot;
      }, 0)
    );
  }, 0);
};
