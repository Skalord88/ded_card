import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  weaponLight,
  weaponRanged,
  weaponThrown,
  weaponTwoHanded
} from "../../functions";
import {
  Armor,
  Attacks,
  CharacterPc,
  Inventory,
  Item,
  Shield,
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
  attacksPositionElement,
  ModifiedCharacter,
  numberOfAttacksMap,
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

  // console.log("toListBab", toListBab);

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

  const weaponEnchantmentBonusMap = (
    arMap: BonusResultMap,
    weapon: Weapon
  ): BonusResultMap => {
    const withEnchantments = { ...arMap };

    // reset
    withEnchantments["enchantmentBonus"] = [];

    if (weapon.enchantmentBonus) {
      withEnchantments["enchantmentBonus"].push({
        bonus: weapon.enchantmentBonus === -1 ? 1 : weapon.enchantmentBonus,
        text: weapon.name,
        source: {
          id: weapon.itemId,
          name: weapon.name,
          itemType: "Weapon",
          cost: weapon.cost,
          weight: weapon.weight,
          description: weapon.description
        } as Item
      });
    }

    return withEnchantments;
  };

  const createWeaponElement = (
    weapon: Weapon | undefined,
    text: boolean,
    position?: string,
    bab?: number
    // babMelee?: number,
    // babRanged?: number
  ): WeaponElement => {
    if (!weapon) return {};
    const updatedAttacksRollMap = weaponEnchantmentBonusMap(
      newAr || {},
      weapon
    );
    const updatedDamageMap = weaponEnchantmentBonusMap(newDb || {}, weapon);
    const light: boolean = weaponLight(weapon);
    const ranged: boolean = weaponRanged(weapon);
    const thrown: boolean = weaponThrown(weapon);
    const twoHanded: boolean = weaponTwoHanded(weapon);
    const toListMeleeAttack: TotAndBonusElement[] | undefined = !ranged
      ? createTotAndBonusElement(updatedAttacksRollMap || {}, text, [
          "Melee",
          weapon.itemId
        ])
      : undefined;
    const babMelee: number | undefined =
      !ranged && weapon
        ? returnBonusSpecific(updatedAttacksRollMap, ["Melee", weapon.itemId])
        : undefined;
    const toListMeleeTwoWeaponAttack =
      toListMeleeAttack && !ranged && position
        ? (() => {
            const isFirstSet = ["w1", "wA"].includes(position);
            const isSecondSet = ["w21", "w2A"].includes(position);
            const isOffHand = ["w2", "w22"].includes(position);

            if (!isFirstSet && !isSecondSet && !isOffHand) {
              return undefined;
            }

            const isLight = isFirstSet
              ? listOfWeapons[2].type.includes("LIGHT")
              : isSecondSet
                ? listOfWeapons[3].type.includes("LIGHT")
                : light;

            const isPrimary = isFirstSet || isSecondSet;

            return [
              ...toListMeleeAttack,
              ...attacksPositionElement(
                isPrimary,
                isLight,
                true // TODO talento two weapon fighting
              )
            ];
          })()
        : undefined;
    const toListMeleeDamage: TotAndBonusElement[] | undefined = !ranged
      ? createTotAndBonusElement(updatedDamageMap || {}, text, [
          "Melee",
          weapon.itemId
        ])
      : undefined;
    const numberOfAllAttacksMelee
    : TotAndBonusElement[][] = toListMeleeAttack?
    numberOfAttacksMap(
      bab || 0,
      toListMeleeAttack
    ) : [[]];
    return {
      weapon: weapon,
      weaponLight: light,
      weaponRanged: ranged,
      weaponThrown: thrown,
      weaponTwoHanded: twoHanded,
      toListMeleeAttack: toListMeleeAttack,
      toListMeleeTwoWeaponAttack: toListMeleeTwoWeaponAttack,
      toListMeleeDamage: toListMeleeDamage,
      toListRangedAttack: ranged
        ? createTotAndBonusElement(updatedAttacksRollMap || {}, text, [
            "Ranged",
            weapon.itemId
          ])
        : undefined,
      toListRangedDamage: ranged
        ? createTotAndBonusElement(updatedDamageMap || {}, text, [
            "Ranged",
            weapon.itemId
          ])
        : undefined,
      babMelee: babMelee,
      babMeleeTwo: 0,
      numberOfAllAttacksMelee: numberOfAllAttacksMelee,
      babRanged:
        ranged && weapon
          ? returnBonusSpecific(updatedAttacksRollMap, [
              "Ranged",
              weapon.itemId
            ])
          : undefined,
      damageMelee:
        !ranged && weapon
          ? returnBonusSpecific(updatedDamageMap, ["Melee", weapon.itemId])
          : undefined,
      damageRanged:
        ranged && weapon
          ? returnBonusSpecific(updatedDamageMap, ["Ranged", weapon.itemId])
          : undefined
    };
  };

  const firstMelee: WeaponElement = createWeaponElement(
    firstMeleeWeapon,
    false
  );
  const firstRanged: WeaponElement | undefined = firstRangedWeapon
    ? createWeaponElement(firstRangedWeapon, true)
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
    firstAttackSetOne: createWeaponElement(
      listOfWeapons[0],
      false,
      "w1",
      bab
    ),
    secondAttackSetOne: createWeaponElement(
      listOfWeapons[2],
      false,
      "w2",
      bab
    ),
    additionalAttackSetOne: createWeaponElement(
      listOfWeapons[4],
      false,
      "wA",
      bab
    ),
    firstAttackSetTwo: createWeaponElement(
      listOfWeapons[1],
      false,
      "w21",
      bab
    ),
    secondAttackSetTwo: createWeaponElement(
      listOfWeapons[3],
      false,
      "w22",
      bab
    ),
    additionalAttackSetTwo: createWeaponElement(
      listOfWeapons[5],
      false,
      "w2A",
      bab
    )
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
  if (ar) {
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
  }
  return 0;
};
