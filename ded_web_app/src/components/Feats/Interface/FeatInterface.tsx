import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { ClassPcLevel } from "../../ClassPc/Interface/ClassPcLevel";
import { Item } from "../../interfaces";
import { Modifiers } from "../../Modifiers/ModifierInterface";
import { SkillStudyRank } from "../../Skills/interface/SkillsInterface";

export type feat = {
  characterFeatName: string;
  characterFeatSpecial: string;
  characterFeatDescription: string;
}

export type serverFeat = {
  id: number;
  featName: string;
  featsType: string;
  description: string;
}

export interface FeatProps {
  feats: feat[] | undefined;
  title: string;
}

export interface ServerFeatsProns {
  feats: serverFeat[] | feat[] | undefined;
  title: string;
  selectFeat: (select: serverFeat) => void;
}

export interface ServerFeatsPronsDelete {
  feats: serverFeat[] | undefined;
  title: string;
  deleteFeat: (deleted: number) => void;
}

export type SelectedFeatProps = {
  feat: serverFeat | feat
}

export type ClassFeats = {
  modifiers: any;
  level: number;
  feat: Feat;
  classId: number;
  className: string;
  toSelect: Prerequisite
}

export type Feat = {
  id: number;
  featName: string;
  featsType: string[];
  benefit: string;
  normal: string;
  special: string;
  modifiers: Modifiers[];
  prerequisiteList: Prerequisite;
  toSelect: Prerequisite;
}

export type FeatPc = {
  id: number,
  feat: Feat;
  selected: Prerequisite;
}

export type Prerequisite = {
  id: number;
  abilitys: Abilitys;
  feats: Feat[];
  caster: [];
  bab: Number;
  // skillStudy: SkillStudyRank[];
  armorClass: ArmorClass;
  armorType: string[];
  weaponType: string[];
  schools: string[];
  classPc: ClassPcLevel[];
  items: Item[]
  text: string;

}

export type FeatsToShow = {
  id: number | null,
  title: string,
  feat: Feat,
  modifiers: Modifiers[],
  listOfBonus: Prerequisite | null
}
