import { Abilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Attacks, Inventory, Weapon } from "../../interfaces";
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
  targets?: ModifierTarget[]
};

export type ModifierTarget =
  | ModifierEnum
  | string
  | Weapon[];

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
}

export type WeaponElement = {
  weapon?: Weapon;
  // weaponMelee?: boolean;
  weaponRanged?: boolean;
  toListMeleeAttack?: TotAndBonusElement[];
  toListMeleeDamage?: TotAndBonusElement[];
  toListRangedAttack?: TotAndBonusElement[];
  toListRangedDamage?: TotAndBonusElement[];
  babMelee?: number;
  babRanged?: number;
  damageMelee?: number;
  damageRanged?: number;
}