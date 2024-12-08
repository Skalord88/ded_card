import { ClassFeats } from "../../Feats/Interface/FeatInterface";
import { Skill, Study } from "../../Skills/interface/SkillsInterface";

export type ClassPcLevel = {
    classe: string;
    level: number;
}

export type ClassPc = {
    // id: number;
    // classType: number;
    // className: string;
    level: number;
    firstClass: boolean;
    classCharacter: ClassCharacter;
    // hitDice: number;
    // classBab: number;
    // savingThrow: string;
    // skillPoints: number;
    // feats: ClassFeats[];
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
}