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
  bab: number;
  toListBab: TotAndBonusElement[];
  toListMeleeAttack: TotAndBonusElement[];
  // toListMeleeDamage: TotAndBonusElement[];
  toListRangedAttack?: TotAndBonusElement[];
  // toListRangedDamage?: TotAndBonusElement[];
  babMelee: number;
  babRanged: number;
  firstMelee: WeaponElement;
  firstRanged?: WeaponElement;
  firstAttackSetOne?: WeaponElement;
  secondAttackSetOne?: WeaponElement;
  additionalAttackSetOne?: WeaponElement;
  firstAttackSetTwo?: WeaponElement;
  secondAttackSetTwo?: WeaponElement;
  additionalAttackSetTwo?: WeaponElement;
};

export type WeaponElement = {
  weapon?: Weapon;
  // weaponMelee?: boolean;
  weaponLight?: boolean;
  weaponRanged?: boolean;
  weaponThrown?: boolean;
  weaponTwoHanded?: boolean;
  toListMeleeAttack?: TotAndBonusElement[];
  toListMeleeTwoWeaponAttack?: TotAndBonusElement[];
  toListMeleeDamage?: TotAndBonusElement[];
  toListRangedAttack?: TotAndBonusElement[];
  toListRangedTwoWeaponAttack?: TotAndBonusElement[];
  toListRangedDamage?: TotAndBonusElement[];
  babMelee?: number;
  babMeleeTwo?: number;
  numberOfAllAttacksMelee?: TotAndBonusElement[][];
  babRanged?: number;
  babRangedTwo?: number;
  numberOfAllAttacksRangedTwo?: TotAndBonusElement[][];
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
  toListAttack: TotAndBonusElement[]
): TotAndBonusElement[][] => {
  const quanteListe: TotAndBonusElement[] = attacksMapElement.filter(
    (attack) => bab - attack.bonus > 0
  );
  const numberOfAttacks: TotAndBonusElement[][] = quanteListe.map(
    (q: TotAndBonusElement, index) => {
      return [quanteListe[index], ...toListAttack];
    }
  );
  return numberOfAttacks;
};
