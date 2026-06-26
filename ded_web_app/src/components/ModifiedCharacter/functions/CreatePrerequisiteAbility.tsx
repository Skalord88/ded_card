import { Abilitys } from "../../Abilitys/Interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { ModifierBonus } from "../../Prerequisite/interface/ModifierBonus";
import {
  ABILITY_MODIFIER,
  FORTITUDE_MODIFIER,
  GRAPPLE,
  MELEE,
  RANGED,
  REFLEX_MODIFIER,
  THROWN,
  WILL_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { Skill } from "../../Skills/interface/Skill";
import { Study } from "../../Skills/interface/Study";

export const createPrerequisiteAbility = (
  allPrerequisite: Prerequisite[],
  ability: Abilitys,
  skillsFromDb?: Skill[],
  studiesFromDb?: Study[]
): Prerequisite[] => {

  const modStrength: number = Math.floor((ability.strength - 10) / 2);
  const skillsStrength =
  skillsFromDb?.filter(
    (skill) => skill.ability === "STRENGTH"
  ) || [];

  const modDexterity: number = Math.floor((ability.dexterity - 10) / 2);
  const skillsDexterity: Skill[] =
    skillsFromDb?.filter((skill) => skill.ability === "DEXTERITY") || [];
  const modConstitution: number = Math.floor((ability.constitution - 10) / 2);
  const skillsConstitution: Skill[] =
    skillsFromDb?.filter((skill) => skill.ability === "CONSTITUTION") || [];
  const modIntelligence: number = Math.floor((ability.intelligence - 10) / 2);
  const skillsIntelligence: Skill[] =
    skillsFromDb?.filter((skill) => skill.ability === "INTELLIGENCE") || [];
  const studiesIntelligence: Study[] = studiesFromDb || [];
  const modWisdom: number = Math.floor((ability.wisdom - 10) / 2);
  const skillsWisdom: Skill[] =
    skillsFromDb?.filter((skill) => skill.ability === "WISDOM") || [];
  const modCharisma: number = Math.floor((ability.charisma - 10) / 2);
  const skillsCharisma: Skill[] =
    skillsFromDb?.filter((skill) => skill.ability === "CHARISMA") || [];

  const strenghtPrerequisite: Prerequisite = {
    id: -1
    , text: `Strength modifiers`

    , attackRoll: [
      {
        bonus: modStrength,
        modifierType: ABILITY_MODIFIER,
        target: [
          MELEE,
          GRAPPLE
        ]
      } as ModifierBonus
    ]

    , damageBonus: [
      {
        bonus: modStrength,
        modifierType: ABILITY_MODIFIER,
        target: [
          MELEE,
          THROWN
        ]
      } as DamageBonus
    ]

    , skillStudy: skillsStrength.map((skill) => ({
      skill:skill,
      rank: modStrength,
      modifierBonus: ABILITY_MODIFIER
    })) as PrerequisiteSkills[]
  } as Prerequisite;
  const dexterityPrerequisite: Prerequisite = {
    id: -1
    , text: `Dexterity modifiers`

    , armorClass: [
      {
        bonus: modDexterity,
        modifierType: ABILITY_MODIFIER
      }
    ]

    , attackRoll: [
      {
        bonus: modDexterity,
        modifierType: ABILITY_MODIFIER,
        target: [RANGED, THROWN]
      } as ModifierBonus
    ]

    , savingThrow: [
      {
        // modifier: REFLEX_MODIFIER,
        modifierType: ABILITY_MODIFIER,
        bonus: modDexterity,
        target: [REFLEX_MODIFIER]
      } as ModifierBonus
    ]

    , skillStudy: skillsDexterity.map((skill) => ({
      skill:skill,
      rank: modDexterity,
      modifierBonus: ABILITY_MODIFIER
    })) as PrerequisiteSkills[]
  } as Prerequisite;

  const constitutionPrerequisite: Prerequisite = {
    id: -1,
    text: `Constitution modifiers`,

    savingThrow: [
      {
        // modifier: FORTITUDE_MODIFIER,
        modifierType: ABILITY_MODIFIER,
        bonus: modConstitution,
        target: [FORTITUDE_MODIFIER]
      } as ModifierBonus
    ]

    , skillStudy: skillsConstitution.map((skill) => ({
      skill:skill,
      rank: modConstitution,
      modifierBonus: ABILITY_MODIFIER
    })) as PrerequisiteSkills[]
  } as Prerequisite;

  const intelligencePrerequisite: Prerequisite = {
    id: -1
    , text: `Intelligence modifiers`

    , skillStudy: [
  ...skillsIntelligence.map((skill) => ({
    skill,
    rank: modIntelligence,
    modifierBonus: ABILITY_MODIFIER
  })),
  ...studiesIntelligence.map((study) => ({
    study: study,
    rank: modIntelligence,
    modifierBonus: ABILITY_MODIFIER
  }))
] as PrerequisiteSkills[]
    } as Prerequisite;

  const wisdomPrerequisite: Prerequisite = {
    id: -1
    , text: `Wisdom modifiers`

    , savingThrow: [
      {
        // modifier: WILL_MODIFIER,
        modifierType: ABILITY_MODIFIER,
        bonus: modWisdom,
        target: [WILL_MODIFIER]
      } as ModifierBonus
    ]

    , skillStudy: skillsWisdom.map((skill) => ({
        skill:skill,
        rank: modWisdom,
        modifierBonus: ABILITY_MODIFIER
      })) as PrerequisiteSkills[]
  } as Prerequisite;

  const charismaPrerequisite: Prerequisite = {
    id: -1
    , text: `Charisma modifiers`

    , skillStudy: skillsCharisma.map((skill) => ({
        skill:skill,
        rank: modCharisma,
        modifierBonus: ABILITY_MODIFIER
      })) as PrerequisiteSkills[]
  } as Prerequisite;

  const abilityPrerequisite: Prerequisite[] = [
    strenghtPrerequisite,
    dexterityPrerequisite,
    constitutionPrerequisite,
    intelligencePrerequisite,
    wisdomPrerequisite,
    charismaPrerequisite
  ];

  return allPrerequisite.concat(abilityPrerequisite);
};

// MELEE
// RANGED
