import { Abilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Inventory, Weapon } from "../../interfaces";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { HitDiceMap } from "../../Vita/Functions";
import { BonusResultMap } from "../functions/GetBonusResult";
import { TotAndBonusElement } from "../SummaryChar";

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
  title: string;
  abilitys: Abilitys;
  abilitysMod?: BonusResultMap;
  // bab: number;
  // babMelee: number;
  // babRanged: number;
  attackRollMod: BonusResultMap;
  damageBonusMod?: BonusResultMap;
  savingThrowMod?: AllModifiers;
  armorClassMod?: BonusResultMap;
  toListArmorClass?: TotAndBonusElement[];
  skillStudyMod?: AllModifiers;
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
  listBab: TotAndBonusElement[][]; // lista di tutti gli attacchi in base al bab, da 1 a 4
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
  listBabRangedSpecificBonus?: TotAndBonusElement[][];
  listBabRangedTwoWeaponSpecificBonus?: TotAndBonusElement[][];
  toListRangedDamage?: TotAndBonusElement[];
  babMelee?: number;
  babMeleeTwo?: number;
  babRanged?: number;
  babRangedTwo?: number;
  damageMelee?: number;
  damageMeleeTwo?: number;
  damageRanged?: number;
  damageRangedTwo?: number;
};

export const attacksMapElement: TotAndBonusElement[] = [
  { bonus: 0, pop: { text: "first attack" } },
  { bonus: -5, pop: { text: "second attack -5 to hit" } },
  { bonus: -10, pop: { text: "third attack -10 to hit" } },
  { bonus: -15, pop: { text: "fourth attack -15 to hit" } }
];

export const attacksPositionElement = (
  first: boolean,
  secondLight: boolean,
  feat: boolean
): TotAndBonusElement[] => [
  {
    bonus: first ? (secondLight ? (feat ? -2 : -4) : -4) : -6 || 0,
    pop: { text: "Two-Weapon Fighting Penalties" }
  }
];

export const numberOfAttacksMap = (
  bab: number,
  toListAttack: TotAndBonusElement[],
  first?: boolean,
  secondLight?: boolean,
  twoAttacks?: boolean
): TotAndBonusElement[][] => {
  // console.log("attacksMapElement", attacksMapElement)
  const quanteListe = attacksMapElement.filter(
  attack => attack.bonus + Math.floor(bab) > 0
);
  const numberOfAttacks: TotAndBonusElement[][] = quanteListe.map(
    (q: TotAndBonusElement, index) => {
      if (first === undefined && secondLight === undefined && !twoAttacks) {
        return [quanteListe[index], ...toListAttack];
      } else {
        return [
          quanteListe[index],
          ...attacksPositionElement(
            first || false,
            secondLight || false,
            true // TODO talento two weapon fighting
          ),
          ...toListAttack
        ];
      }
    }
  );
  return numberOfAttacks;
};
