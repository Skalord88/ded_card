import { Abilitys } from "../../Abilitys/Interface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { ModifierBonus } from "../../interfaces";
import { modifyAbilitys } from "../../Prerequisite/abilitys/functions/function";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
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
    // abilitys: ability,
    text: `Strength modifiers`,

    attackRoll: [
      {
        bonus: modStrength,
        target: [{ text: "Melee" } as ModifierEnum, { text: "Grapple" } as ModifierEnum]
      } as AttackRoll
    ],

    damageBonus: [
      {
        bonus: modStrength,
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
        modifierBonus: { text: "Dex" } as ModifierEnum
      }
    ],

    attackRoll: [
      {
        bonus: modDexterity,
        type: [{ text: "Ranged" } as ModifierEnum]
      } as AttackRoll
    ],

    savingThrow: [
      {
        reflex: modDexterity
      } as SavingThrow
    ]
  } as Prerequisite;

  const constitutionPrerequisite: Prerequisite = {
    id: -1,
    text: `Constitution modifiers`,

    savingThrow: [
      {
        fortitude: modConstitution
      } as SavingThrow
    ]
  } as Prerequisite;

  const wisdomPrerequisite: Prerequisite = {
    id: -1,
    text: `Wisdom modifiers`,

    savingThrow: [
      {
        will: modWisdom
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
