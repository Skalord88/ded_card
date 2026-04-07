import { Abilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Weapon } from "../../interfaces";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { HitDiceMap } from "../../Vita/Functions";
import { BonusResultMap } from "../functions/GetBonusResult";

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
  bab: number;
  attackRollMod: BonusResultMap;
  damageBonusMod?: BonusResultMap;
  savingThrowMod?: AllModifiers;
  armorClassMod?: BonusResultMap;
  skillStudyMod?: AllModifiers;
  adjLevel?: number;
  totLevel?: number;
  race?: SubRace;
  archetypes?: Archetype[];
  classPcList?: ClassPc[];
  listHitDices?: HitDiceMap;
};