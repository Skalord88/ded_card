import { Abilitys } from "../../Abilitys/Interface";
import { getTotalClassLevel } from "../../ClassPc/Function/Function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { findIdsFeatsInList } from "../../Feats/FindFeatsInList";
import {
  createClassPcClassFeats,
  createPcBonusFeats
} from "../../Feats/function";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  weaponDouble,
  weaponLight,
  weaponRanged,
  weaponThrown,
  weaponTwoHanded
} from "../../functions";
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
  FORTITUDE_MODIFIER,
  REFLEX_MODIFIER,
  SAVING,
  WILL_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import {
  findAllAdjLevelInChar,
  findAllAdjLevelInRaceAndArchetypes
} from "../../Race/Function";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { Skill } from "../../Skills/interface/Skill";
import { SkillCharacter, Study } from "../../Skills/interface/SkillsInterface";
import { SkillStudyTotAndBonusElement } from "../../Skills/interface/SkillStudyTotAndBonusElement";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { noneWeapon } from "../../variables";
import { createHitDiceMap } from "../../Vita/Functions";
import {
  AttackElement,
  ModifiedCharacter,
  numberOfAttacksMap,
  numberOfFirstAttacksMap,
  Proficency,
  weaponDamagePoseAndTwoWeapon,
  WeaponElement
} from "../interface/ModifiedCharacter";
import { addModdedAbilitysToAbilitys } from "./AddModdedAbilitysToAbilitys";
import { createCompetenceFromPrerequisites } from "./CreateCompetenceFromPrerequisites";
import { createPrerequisiteAbility } from "./CreatePrerequisiteAbility";
import { createPrerequisiteFromClasses } from "./CreatePrerequisiteFromClasses";
import { createTotAndBonusElement } from "./CreateTotAndBonusElement";
import { createTotAndBonusElementWithSkill } from "./CreateTotAndBonusElementWithSkill";
import { findAllPrerequisite } from "./FindAllPrerequisite";
import { BonusResultMap, getBonusResult } from "./GetBonusResult";
import { filterBonusMap, isGlobalBonus } from "./IsGlobalBonus";
import { resolveBonuses } from "./ResolvesBonuses";

export const modifiedCharacter = (
  char: CharacterPc,
  nome?: string,
  skillsFromDb?: Skill[],
  studiesFromDb?: Study[],
  newAbilitys?: Abilitys,
  newRace?: SubRace,
  newArchetypes?: Archetype[],
  newFeatsList?: FeatPc[],
  newClasses?: ClassPc[],
  newInventory?: Inventory,
  newAttacks?: Attacks,
  newSkills?: SkillCharacter[]
): ModifiedCharacter => {
  const name: string = nome ?? char.characterName;
  const ability: Abilitys = newAbilitys ?? char.abilitys;
  const race: SubRace = newRace ?? char.race;
  const archetypes: Archetype[] = newArchetypes ?? char.archetypes;
  const featsList: FeatPc[] = newFeatsList ?? char.featsList;
  const classPcList: ClassPc[] = newClasses ?? char.classPcList;
  const inventory: Inventory = newInventory ?? char.inventory;
  const attacks: Attacks = newAttacks ?? char.attacks;
  const skills: SkillCharacter[] = newSkills ?? char.skillsCharacter;

  const allPrerequisite: Prerequisite[] = findAllPrerequisite(
    race,
    archetypes,
    featsList,
    classPcList,
    inventory,
    attacks,
    skills
  );

  // console.log("allPrerequisite", allPrerequisite)

  const nAttacksSecond: number = findIdsFeatsInList(
    allPrerequisite,
    (f) => f.feats?.map((ft) => ft.id),
    "Feat"
  );

  const featTwoFight: boolean = allPrerequisite.some((f) =>
    f?.feats?.some((ft) => ft.id === 105)
  );

  const newAb: BonusResultMap = getBonusResult(allPrerequisite, "abilitys");

  // console.log("newAb", newAb)

  const newAbility: Abilitys = addModdedAbilitysToAbilitys(ability, newAb);

  const allPrerequisiteWithAbilities: Prerequisite[] =
    createPrerequisiteAbility(
      allPrerequisite,
      newAbility,
      skillsFromDb,
      studiesFromDb
    );

    // console.log("allPrerequisiteWithAbilities", allPrerequisiteWithAbilities)

  const allPrerequisiteFromClasses: Prerequisite[] =
    createPrerequisiteFromClasses(allPrerequisiteWithAbilities, classPcList);

  const proficency: Proficency = createCompetenceFromPrerequisites(
    allPrerequisiteFromClasses
  );

  const newAr: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "attackRoll"
  );

  // console.log("newAr", newAr)

  const newDb: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "damageBonus"
  );

  const newAc: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "armorClass"
  );

  const toListArmorClass: TotAndBonusElement[] = [
    { bonus: 10, pop: BASE_VALUE }
  ].concat(createTotAndBonusElement(newAc || {}, true));

  const sT: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "savingThrow"
  );

  const fortitude: TotAndBonusElement[] = createTotAndBonusElement(sT, true, [
    FORTITUDE_MODIFIER.text,
    SAVING.text
  ]);
  const reflex: TotAndBonusElement[] = createTotAndBonusElement(sT, true, [
    REFLEX_MODIFIER.text,
    SAVING.text
  ]);
  const will: TotAndBonusElement[] = createTotAndBonusElement(sT, true, [
    WILL_MODIFIER.text,
    SAVING.text
  ]);

  const sS: BonusResultMap = getBonusResult(
    allPrerequisiteFromClasses,
    "skillStudy"
  );

  const skillsTotAndBonus: SkillStudyTotAndBonusElement[] =
    createTotAndBonusElementWithSkill(
      skillsFromDb || [],
      studiesFromDb || [],
      sS
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

  
  // const bab: number = returnBonus(newAr);
  const bab: number = returnBonus(newAr);

  // console.log("bab", bab)

  

  // const listBab: TotAndBonusElement[] = createTotAndBonusElement(
  //   specificNewAr || {},
  //   true
  // );
  const listBab: TotAndBonusElement[] = createTotAndBonusElement(
    newAr || {},
    true
  );

  // console.log("listBab", listBab)

  const listBabMeleeGeneralBonus: TotAndBonusElement[][] = numberOfAttacksMap(
    bab,
    createTotAndBonusElement(newAr || {}, true, ["Melee"]),
    false
  );

  const listBabRangedGeneralBonus: TotAndBonusElement[][] = numberOfAttacksMap(
    bab,
    createTotAndBonusElement(newAr || {}, true, ["Ranged", "Thrown"]),
    false
  );

  const babMelee: number = returnBonusSpecific(newAr, ["Melee"]);

  const babRanged: number = returnBonusSpecific(newAr, ["Ranged", "Thrown"]);

  const listOfWeapons = [
    attacks?.firstAttackSetOne || noneWeapon,
    attacks?.firstAttackSetTwo || noneWeapon,

    attacks?.secondAttackSetOne || noneWeapon,
    attacks?.secondAttackSetTwo || noneWeapon,

    attacks?.additionalAttackSetOne || noneWeapon,
    attacks?.additionalAttackSetTwo || noneWeapon
  ];
  const firstMeleeWeapon: Weapon =
    listOfWeapons.find((w: Weapon) => !w?.type.includes("RANGED")) || noneWeapon;
  const firstRangedWeapon: Weapon | undefined = listOfWeapons.find((w) =>
    ["RANGED", "THROWN"].some(s => w.type.includes(s))
  );

  // console.log("firstRangedWeapon", listOfWeapons, firstRangedWeapon);

  const globalNewAr = filterBonusMap(newAr, isGlobalBonus);
  const specificNewAr = filterBonusMap(newAr, b => !isGlobalBonus(b));

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
        targets: 
        [{
          id: weapon.itemId,
          name: weapon.name,
          itemType: "Weapon",
          cost: weapon.cost,
          weight: weapon.weight,
          description: weapon.description
        }] as Item[]
      });
    }

    return withEnchantments;
  };

  const summedBab: TotAndBonusElement = {
    bonus: listBab.reduce((sum, el) => sum + el.bonus, 0),
    text: "Summed BAB",
    pop: BASE_VALUE
  };

  const createWeaponElement = (
    weapon: Weapon | undefined,
    text: boolean,
    position: string,
    bab?: number
  ): WeaponElement => {
    if (!weapon) return {};
    const updatedAttacksRollMap: BonusResultMap = weaponEnchantmentBonusMap(
      specificNewAr || {},
      weapon
    );
    // const updatedAttacksRollMap: BonusResultMap = weaponEnchantmentBonusMap(
    //   newAr || {},
    //   weapon
    // );
    // weapon.itemId === 22 && console.log("newAr", newAr)
    const updatedDamageMap: BonusResultMap = weaponEnchantmentBonusMap(
      newDb || {},
      weapon
    );

    const isFirstSet: boolean = ["w1", "wA"].includes(position);
    const isSecondSet: boolean = ["w21", "w2A"].includes(position);
    const isLight: boolean = isFirstSet
      ? listOfWeapons[2].type.includes("LIGHT")
      : isSecondSet
        ? listOfWeapons[3].type.includes("LIGHT")
        : false;
    const isPrimary: boolean = isFirstSet || isSecondSet;
    const light: boolean = weaponLight(weapon);
    const ranged: boolean = weaponRanged(weapon);
    const thrown: boolean = weaponThrown(weapon);
    const twoHanded: boolean = weaponTwoHanded(weapon);
    const double: boolean = weaponDouble(weapon);
    const listBabMeleeSpecificBonus: TotAndBonusElement[][] | undefined =
      !ranged
        ? numberOfFirstAttacksMap(
            bab || 0,
            createTotAndBonusElement(updatedAttacksRollMap || {}, true, [
              "Melee",
              weapon.itemId
            ]).concat(summedBab)
          )
        : undefined;

    const listBabMeleeTwoWeaponSpecificBonus:
      TotAndBonusElement[][] | undefined = !ranged
      ? numberOfAttacksMap(
          bab || 0,
          createTotAndBonusElement(updatedAttacksRollMap || {}, true, [
            "Melee",
            weapon.itemId
          ]).concat(summedBab),
          true,
          isPrimary,
          isLight,
          nAttacksSecond,
          featTwoFight
        )
      : undefined;

    const toListMeleeDamage: TotAndBonusElement[] | undefined = !ranged
      ? weaponDamagePoseAndTwoWeapon(
          createTotAndBonusElement(updatedDamageMap || {}, text, [
            "Melee",
            weapon.itemId
          ]),
          true,
          twoHanded
        )
      : undefined;
    const toListMeleeTwoWeaponDamage: TotAndBonusElement[] | undefined = !ranged
      ? weaponDamagePoseAndTwoWeapon(
          createTotAndBonusElement(updatedDamageMap || {}, text, [
            "Melee",
            weapon.itemId
          ]),
          false,
          twoHanded
        )
      : undefined;

      // console.log(weapon.name, "summedBab", summedBab)

    const listBabRangedSpecificBonus: TotAndBonusElement[][] | undefined =
      ranged || thrown
        ? numberOfFirstAttacksMap(
            bab || 0,
            createTotAndBonusElement(updatedAttacksRollMap || {}, true, [
              "Ranged",
              "Thrown",
              weapon.itemId
            ]).concat(summedBab)
          )
        : undefined;

        // listBabRangedSpecificBonus && console.log(weapon)
        // listBabRangedSpecificBonus && console.log(weapon.name, "listBabRangedSpecificBonus", listBabRangedSpecificBonus )

    const listBabRangedTwoWeaponSpecificBonus:
      TotAndBonusElement[][] | undefined =
      ranged || thrown
        ? numberOfAttacksMap(
            bab || 0,
            createTotAndBonusElement(updatedAttacksRollMap || {}, true, [
              "Ranged",
              "Thrown",
              weapon.itemId
            ]).concat(summedBab),
            true,
            isPrimary,
            isLight,
            nAttacksSecond,
            featTwoFight
          )
        : undefined;

    const toListRangedDamage: TotAndBonusElement[] | undefined =
      ranged || thrown
        ? weaponDamagePoseAndTwoWeapon(
            createTotAndBonusElement(updatedDamageMap || {}, text, [
              "Ranged",
              "Thrown",
              weapon.itemId
            ]),
            true,
            twoHanded
          )
        : undefined;
        console.log("updatedDamageMap", updatedDamageMap)
    const toListRangedTwoWeaponDamage: TotAndBonusElement[] | undefined =
      ranged || thrown
        ? weaponDamagePoseAndTwoWeapon(
            createTotAndBonusElement(updatedDamageMap || {}, text, [
              "Ranged",
              "Thrown",
              weapon.itemId
            ]),
            false,
            twoHanded
          )
        : undefined;

    const babMelee: number | undefined =
      bab && !ranged && weapon
        ? bab +
          returnBonusSpecific(
            updatedAttacksRollMap,
            ["Melee", weapon.itemId]
            // ],
          )
        : undefined;
    // babMelee && console.log("babMelee", weapon.name, babMelee)

    const babRanged: number | undefined =
      bab && (ranged || thrown) && weapon
        ? bab +
          returnBonusSpecific(updatedAttacksRollMap, [
            "Ranged",
            "Thrown",
            weapon.itemId
          ])
        : undefined;

        const damageMelee: number | undefined = !ranged && weapon
          ? returnBonusSpecific(updatedDamageMap, ["Melee", weapon.itemId])
          : undefined;
        const damageMeleeTwoWeapon: number | undefined = toListMeleeTwoWeaponDamage?.reduce((tot, d) => tot + d.bonus, 0) || 0
        const damageRanged: number | undefined = ranged && weapon
          ? returnBonusSpecific(updatedDamageMap, [
              "Ranged",
              "Thrown",
              weapon.itemId
            ])
          : undefined
          const damageRangedTwoWeapon: number = toListRangedTwoWeaponDamage?.reduce((tot, d) => tot + d.bonus, 0) || 0
    return {
      // WeaponElement
      weapon: weapon,
      weaponLight: light,
      weaponRanged: ranged,
      weaponThrown: thrown,
      weaponTwoHanded: twoHanded,
      double: double,
      listBabMeleeSpecificBonus: listBabMeleeSpecificBonus,
      listBabMeleeTwoWeaponSpecificBonus: listBabMeleeTwoWeaponSpecificBonus,
      toListMeleeDamage: toListMeleeDamage,
      toListMeleeTwoWeaponDamage: toListMeleeTwoWeaponDamage,
      listBabRangedSpecificBonus: listBabRangedSpecificBonus,
      listBabRangedTwoWeaponSpecificBonus: listBabRangedTwoWeaponSpecificBonus,
      toListRangedDamage: toListRangedDamage,
      toListRangedTwoWeaponDamage: toListRangedTwoWeaponDamage,
      babMelee: babMelee,
      babRanged: babRanged,
      damageMelee: damageMelee,
      damageMeleeTwoWeapon: damageMeleeTwoWeapon,
      damageRanged: damageRanged,
      damageRangedTwoWeapon: damageRangedTwoWeapon
    };
  };

  const firstMelee: WeaponElement = createWeaponElement(
    firstMeleeWeapon,
    false,
    "w1",
    bab
  );
  const firstRanged: WeaponElement | undefined = firstRangedWeapon
    ? createWeaponElement(firstRangedWeapon, true, "w1", bab)
    : undefined;

  const newAttacksElement: AttackElement = {
    listOfWeapons: listOfWeapons,
    bab: bab,
    listBab: listBab,
    summedBab: summedBab,
    listBabMeleeGeneralBonus: listBabMeleeGeneralBonus,
    listBabRangedGeneralBonus: listBabRangedGeneralBonus,
    babMelee: babMelee,
    babRanged: babRanged,
    firstMelee: firstMelee,
    firstRanged: firstRanged,
    firstAttackSetOne: createWeaponElement(listOfWeapons[0], false, "w1", bab),
    secondAttackSetOne: createWeaponElement(listOfWeapons[2], false, "w2", bab),
    additionalAttackSetOne: createWeaponElement(
      listOfWeapons[4],
      false,
      "wA",
      bab
    ),
    firstAttackSetTwo: createWeaponElement(listOfWeapons[1], false, "w21", bab),
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

  const pcBonusFeats = createPcBonusFeats(classPcList, featsList);
  const classPcClassFeats = createClassPcClassFeats(classPcList, featsList);

  const feats: FeatPc[] = [...pcBonusFeats, ...classPcClassFeats];
  return {
    name: name,
    title: title,
    abilitys: newAbility,
    abilitysMod: newAb,
    attackRollMod: newAr,
    damageBonusMod: newDb,
    fortitude: fortitude,
    reflex: reflex,
    will: will,
    skillsTotAndBonus: skillsTotAndBonus,
    // skills: skills,
    armorClassMod: newAc,
    toListArmorClass: toListArmorClass,
    adjLevel: adjLevel,
    totLevel: totLevel,
    race: race,
    archetypes: archetypes,
    classPcList: classPcList,
    listHitDices: listHitDices,
    proficency: proficency,
    inventory: inventory,
    attacks: newAttacksElement,
    feats: feats
    // feats
  };
};

export const isToAdd = (key: string): boolean => {
  return [
    "Untyped",
    ABILITY_MODIFIER.text,
    DEFLECTION_BONUS.text
  ].includes(key);
};

export const returnBonus = (
  map: BonusResultMap
): number => {

  return resolveBonuses(map)
    .reduce(
      (tot, r) => tot + r.bonus.bonus,
      0
    );

};

export const returnBonusSpecific = (
  map: BonusResultMap,
  search:(string|number)[]
):number => {

  return resolveBonuses(map, search)
    .reduce(
      (tot,r)=>tot+r.bonus.bonus,
      0
    );

};