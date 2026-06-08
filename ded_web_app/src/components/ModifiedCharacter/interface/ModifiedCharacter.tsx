import { Abilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Inventory, Weapon } from "../../interfaces";
import {
    ModifierEnum,
    STRENGTH_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { Skill } from "../../Skills/interface/Skill";
import { SkillCharacter, Study } from "../../Skills/interface/SkillsInterface";
import { TotAndBonusElement } from "../../SummaryChar/SummaryChar";
import { HitDiceMap } from "../../Vita/Functions";
import { BonusResultMap } from "../functions/GetBonusResult";

export type BonusResult = {
  key: string;
  bonus: number;
  targets?: ModifierTarget[];
};

export type ModifierTarget = ModifierEnum | string | Weapon[];

export type TargetEntry = {
  bonus: number;
  text: string;
  targets?: ModifierTarget[];
};

export type ModifierResult = {
  bonus: number;
  sources?: TargetEntry[];
};

export type AbilitysEntry = {
  text: string;
  ability: string;
};

export type ModifierAbilityResult = {
  abilitys: Abilitys;
  sources: AbilitysEntry[];
};

export type ModifierSaveResult = {
  text: string;
  fortitude?: number;
  reflex?: number;
  will?: number;
  resistance?: Resistance[];
};

export type ModifierSkillsResult = {
  text: string;
  skillsStudies: PrerequisiteSkills[];
};

export type AllModifiers = {
  [modifier: string]:
    | ModifierResult
    | ModifierSaveResult[]
    | ModifierAbilityResult
    | ModifierSkillsResult[];
};

export type ModifiedCharacter = {
  title?: string;
  abilitys?: Abilitys;
  abilitysMod?: BonusResultMap;
  // bab: number;
  // babMelee: number;
  // babRanged: number;
  attackRollMod?: BonusResultMap;
  damageBonusMod?: BonusResultMap;
  fortitude?: TotAndBonusElement[];
  reflex?: TotAndBonusElement[];
  will?: TotAndBonusElement[];
  armorClassMod?: BonusResultMap;
  toListArmorClass?: TotAndBonusElement[];
  skillsTotAndBonus?: {skill: Skill | Study, list:TotAndBonusElement[]}[]
  // skillStudyMod?: BonusResultMap;
  // skills?: SkillCharacter[];
  adjLevel?: number;
  totLevel?: number;
  race?: SubRace;
  archetypes?: Archetype[];
  classPcList?: ClassPc[];
  listHitDices?: HitDiceMap;
  inventory?: Inventory;
  attacks?: AttackElement;
};

export type AttackElement = {
  listOfWeapons: Weapon[];
  bab: number; // tot bab del pg
  listBab: TotAndBonusElement[]; // lista di tutti gli attacchi in base al bab, da 1 a 4
  summedBab: TotAndBonusElement;
  listBabMeleeGeneralBonus: TotAndBonusElement[][]; // toListBab con i bonus per il melee
  // toListMeleeDamage: TotAndBonusElement[];
  listBabRangedGeneralBonus?: TotAndBonusElement[][]; // toListBab con i bonus per il ranged
  // toListRangedDamage?: TotAndBonusElement[];
  babMelee: number; // max bab con i bonus del melee
  babRanged: number; // max bab con i bonus del ranged
  firstMelee: WeaponElement; // trova la migliore arma melee
  firstRanged?: WeaponElement; // trova la migliore arma ranged
  firstAttackSetOne?: WeaponElement; // costruisci l'elemento arma
  secondAttackSetOne?: WeaponElement;
  additionalAttackSetOne?: WeaponElement;
  firstAttackSetTwo?: WeaponElement;
  secondAttackSetTwo?: WeaponElement;
  additionalAttackSetTwo?: WeaponElement;
};

export type WeaponElement = {
  weapon?: Weapon; // che arma
  weaponLight?: boolean; // se leggera
  weaponRanged?: boolean; // se ranged
  weaponThrown?: boolean; // se lanciata
  weaponTwoHanded?: boolean; // se a 2 mani
  listBabMeleeSpecificBonus?: TotAndBonusElement[][]; // attacco completo un arma melee
  listBabMeleeTwoWeaponSpecificBonus?: TotAndBonusElement[][]; // attacco completo due armi melee
  toListMeleeDamage?: TotAndBonusElement[];
  toListMeleeTwoWeaponDamage?: TotAndBonusElement[];
  listBabRangedSpecificBonus?: TotAndBonusElement[][]; // attacco completo un arma ranged
  listBabRangedTwoWeaponSpecificBonus?: TotAndBonusElement[][]; // attacco completo due armi ranged
  toListRangedDamage?: TotAndBonusElement[];
  toListRangedTwoWeaponDamage?: TotAndBonusElement[];
  babMelee?: number; // [bab generale , bab specifico] applicato il signAndCountToString
  babRanged?: number; // [bab generale , bab specifico] applicato il signAndCountToString
  damageMelee?: number;
  damageRanged?: number;
};

export const attacksMapElement: TotAndBonusElement[] = [
  { bonus: 0, pop: { text: "first attack" } },
  { bonus: -5, pop: { text: "second attack: -5 to hit" } },
  { bonus: -10, pop: { text: "third attack: -10 to hit" } },
  { bonus: -15, pop: { text: "fourth attack: -15 to hit" } }
];

export const attacksPositionElement = (
  first: boolean,
  secondLight: boolean,
  feat: boolean
): TotAndBonusElement[] => {
  let total: number;

  if (feat && secondLight) {
    total = -2;
  } else if (feat) {
    total = -4;
  } else if (secondLight) {
    total = first ? -4 : -8;
  } else {
    total = first ? -6 : -10;
  }

  return [
    {
      bonus: total,
      pop: { text: "Two-Weapon Fighting Penalties" }
    }
  ];
};

export const numberOfFirstAttacksMap = (
  bab: number,
  toListAttack: TotAndBonusElement[]
): TotAndBonusElement[][] => {
  const quanteListe: TotAndBonusElement[] = attacksMapElement.filter(
    (attack) => attack.bonus + Math.floor(bab) > 0
  );

  if (quanteListe.length === 0) {
    return [[]];
  }

  const numberOfAttacks: TotAndBonusElement[][] = quanteListe.map(
    (q: TotAndBonusElement, index) => {
      return [quanteListe[index], ...toListAttack];
    }
  );
  return numberOfAttacks;
};

export const numberOfAttacksMap = (
  bab: number,
  toListAttack: TotAndBonusElement[],
  twoAttacks: boolean,
  first?: boolean,
  secondLight?: boolean,
  nAttacksSecond?: number,
  featTwoFight?: boolean
): TotAndBonusElement[][] => {
  let quanteListe: TotAndBonusElement[] = [];
  if (first) {
    quanteListe = attacksMapElement.filter(
      (attack) => attack.bonus + Math.floor(bab) > 0
    );
  } else if (twoAttacks === true && typeof nAttacksSecond === "number") {
    quanteListe = attacksMapElement.slice(0, nAttacksSecond);
  }

  if (quanteListe.length === 0) {
    return [[]];
  }
  const numberOfAttacks: TotAndBonusElement[][] = quanteListe.map(
    (q: TotAndBonusElement, index) => {
      if (!twoAttacks) {
        return [quanteListe[index], ...toListAttack];
      } else {
        return [
          quanteListe[index],
          ...attacksPositionElement(
            first || false,
            secondLight || false,
            featTwoFight || false
          ),
          ...toListAttack
        ];
      }
    }
  );
  return numberOfAttacks;
};

export const weaponDamagePoseAndTwoWeapon = (
  list: TotAndBonusElement[],
  pose: boolean,
  twoHand: boolean
): TotAndBonusElement[] => {
  const newList = list
    .map((l) => l.pop === STRENGTH_MODIFIER)
    .map((isStrengthModifier, index) => {
      if (isStrengthModifier) {
        const bonus = pose
          ? list[index].bonus / 2
          : twoHand
            ? list[index].bonus + Math.floor(list[index].bonus / 2)
            : list[index].bonus;
        return { ...list[index], bonus };
      }
      return list[index];
    });

  return newList;
};
