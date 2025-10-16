import { ClassFeats } from "../../Feats/Interface/FeatInterface";
import { Skill } from "../../Skills/interface/Skill";
import { Study } from "../../Skills/interface/SkillsInterface";

export type ClassPcLevel = {
    classe: string;
    level: number;
}

export type ClassPc = {
    level: number;
    firstClass: boolean;
    classCharacter: ClassCharacter;
    baseClass?: number;
  }

  export type SpellsInLevel = {
    level: number;
    spells: number [];
  }

  export type SpellsTable = {
    magicClass: string;
    spellsDayKnown: string;
    spellsInLevel: SpellsInLevel[]
  }

export type ClassCharacter = {
  id: number;
  classType: string;
  className: string;
  avatarUrl: string;
  hitDice: number;
  classBab: number;
  savingThrow: string;
  skillPoints: number;
  classSkill: Skill[];
  classStudy: Study[];
  classFeats: ClassFeats[];
  spellsPerDay?: SpellsTable;
  spellsKnown?: SpellsTable;
  spellBonus?: string
  spellsDomain?: string;
  
}