import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { ModifierBonus } from "../../interfaces";
import { modifyAbilitys } from "../../Prerequisite/abilitys/functions/function";
import { ABILITY_MODIFIER, EMPTY_BONUS, ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
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

  // const baseAbilitys: Prerequisite = {
  //   id: -1,
  //   abilitys: ability,
  // }

  const strenghtPrerequisite: Prerequisite = {
    id: -1,
    text: `Strength modifiers`,

    attackRoll: [
      {
        bonus: modStrength,
        // modifierBonus: ABILITY_MODIFIER as ModifierEnum,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Melee and Grapple attacks", text: "Strength"} as ModifierEnum,
        target: [{ text: "Melee" } as ModifierEnum, { text: "Grapple" } as ModifierEnum]
      } as AttackRoll
    ],

    damageBonus: [
      {
        bonus: modStrength,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Melee e Thrown damage", text: "Strength"} as ModifierEnum,
        target: [{ text: "Melee" } as ModifierEnum, { text: "Thrown" } as ModifierEnum],
      } as DamageBonus
    ]
  } as Prerequisite;
  const dexterityPrerequisite: Prerequisite = {
    id: -1,
    text: `Dexterity modifiers`,

    armorClass: [
      {
        bonus: modDexterity,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Armor Class", text: "Dexterity"} as ModifierEnum
      }
    ],

    attackRoll: [
      {
        bonus: modDexterity,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Ranged attack", text: "Dexterity"} as ModifierEnum,
        target: [{ text: "Ranged" } as ModifierEnum]
      } as AttackRoll
    ],

    savingThrow: [
      {
        reflex: modDexterity,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Reflex save", text: "Dexterity"} as ModifierEnum,
      } as SavingThrow
    ]
  } as Prerequisite;

  const constitutionPrerequisite: Prerequisite = {
    id: -1,
    text: `Constitution modifiers`,

    savingThrow: [
      {
        fortitude: modConstitution,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Fortitude save", text: "Constitution"} as ModifierEnum
      } as SavingThrow
    ]
  } as Prerequisite;

  const wisdomPrerequisite: Prerequisite = {
    id: -1,
    text: `Wisdom modifiers`,

    savingThrow: [
      {
        will: modWisdom,
        modifierBonus: {...EMPTY_BONUS, description: "Increase Will save", text: "Wisdom"} as ModifierEnum
      } as SavingThrow
    ]
  } as Prerequisite;

  // console.log("strenghtPrerequisite", strenghtPrerequisite);
  const abilityPrerequisite: Prerequisite[] = [
  // return [
  // baseAbilitys,
    strenghtPrerequisite,
    dexterityPrerequisite,
    constitutionPrerequisite,
    wisdomPrerequisite
  ];

  return allPrerequisite.concat(abilityPrerequisite);
};

// MELEE
// RANGED
