import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { ModifierBonus } from "../../Prerequisite/interface/ModifierBonus";
import {
  EMPTY_BONUS,
  FORTITUDE_MODIFIER,
  ModifierEnum,
  REFLEX_MODIFIER,
  WILL_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { SavingThrow } from "../../Saving/interface";

export const createPrerequisiteAbility = (
  allPrerequisite: Prerequisite[],
  ability: Abilitys
): Prerequisite[] => {
  const modStrength: number = Math.floor((ability.strength - 10) / 2);
  const modDexterity: number = Math.floor((ability.dexterity - 10) / 2);
  const modConstitution: number = Math.floor((ability.constitution - 10) / 2);
  const modIntelligence: number = Math.floor((ability.intelligence - 10) / 2);
  const modWisdom: number = Math.floor((ability.wisdom - 10) / 2);
  const modCharisma: number = Math.floor((ability.charisma - 10) / 2);

  const strenghtPrerequisite: Prerequisite = {
    id: -1,
    text: `Strength modifiers`,

    attackRoll: [
      {
        bonus: modStrength,
        // modifierBonus: ABILITY_MODIFIER as ModifierEnum,
        modifierType: {
          ...EMPTY_BONUS,
          description: "Increase Melee and Grapple attacks",
          text: "Strength"
        } as ModifierEnum,
        target: [
          { text: "Melee" } as ModifierEnum,
          { text: "Grapple" } as ModifierEnum
        ]
      } as ModifierBonus
    ],

    damageBonus: [
      {
        bonus: modStrength,
        modifierBonus: {
          ...EMPTY_BONUS,
          description: "Increase Melee e Thrown damage",
          text: "Strength"
        } as ModifierEnum,
        target: [
          { text: "Melee" } as ModifierEnum,
          { text: "Thrown" } as ModifierEnum
        ]
      } as DamageBonus
    ]
  } as Prerequisite;
  const dexterityPrerequisite: Prerequisite = {
    id: -1,
    text: `Dexterity modifiers`,

    armorClass: [
      {
        bonus: modDexterity,
        modifierBonus: {
          ...EMPTY_BONUS,
          description: "Increase Armor Class",
          text: "Dexterity"
        } as ModifierEnum
      }
    ],

    attackRoll: [
      {
        bonus: modDexterity,
        modifierType: {
          ...EMPTY_BONUS,
          description: "Increase Ranged attack",
          text: "Dexterity"
        } as ModifierEnum,
        target: [{ text: "Ranged" } as ModifierEnum]
      } as ModifierBonus
    ],

    savingThrow: [
      {
        modifier: REFLEX_MODIFIER,
        modifierType: REFLEX_MODIFIER,
        bonus: modDexterity
      } as ModifierBonus
    ]
  } as Prerequisite;

  const constitutionPrerequisite: Prerequisite = {
    id: -1,
    text: `Constitution modifiers`,

    savingThrow: [
      {
        modifier: FORTITUDE_MODIFIER,
        modifierType: FORTITUDE_MODIFIER,
        bonus: modConstitution
      } as ModifierBonus
    ]
  } as Prerequisite;

  const wisdomPrerequisite: Prerequisite = {
    id: -1,
    text: `Wisdom modifiers`,

    savingThrow: [
      {
        modifier: WILL_MODIFIER,
        modifierType: WILL_MODIFIER,
        bonus: modWisdom
      } as ModifierBonus
    ]
  } as Prerequisite;

  const abilityPrerequisite: Prerequisite[] = [
    strenghtPrerequisite,
    dexterityPrerequisite,
    constitutionPrerequisite,
    wisdomPrerequisite
  ];

  return allPrerequisite.concat(abilityPrerequisite);
};

// MELEE
// RANGED
