import { Abilitys } from "../../Abilitys/Interface";
import { armorClass, savingThrows } from "../../interfaces";
import { Modifiers } from "../../Modifiers/ModifierInterface";

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
  listOfBonus: Prerequisite[]
}

export type Feat = {
  id: number;
  featName: string;
  featsType: string;
  modifiers: Modifiers[] ;
  description: string;
}

export type FeatPc = {
  feat: Feat;
  selected: string[];
}

export type Prerequisite = {
  type: string;
  id: number;
}
