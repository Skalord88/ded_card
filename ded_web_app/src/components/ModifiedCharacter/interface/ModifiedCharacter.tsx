import { Abilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";

export type ModifierTarget = string | any[];

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
  abilitysMod?: AllModifiers;
  bab: number;
  attackRollMod: AllModifiers;
  damageBonusMod?: AllModifiers;
  savingThrowMod?: AllModifiers;
  armorClassMod?: AllModifiers;
  skillStudyMod?: AllModifiers;
  adjLevel?: number;
  totLevel?: number;
  race?: SubRace;
  archetypes?: Archetype[];
  classPcList?: ClassPc[];
};