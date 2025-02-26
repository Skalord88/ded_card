import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";

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
  id: number,
  modifiers: any;
  level: number;
  feat: Feat;
  classId: number;
  className: string;
  toSelect?: Prerequisite;
  selected?: Prerequisite;
}

export type Feat = {
  id: number;
  featName: string;
  featType: string[];
  benefit: string;
  normal: string;
  special: string;
  modifiers?: Prerequisite;
  prerequisiteList?: Prerequisite;
  toSelect?: Prerequisite;
  selected?: Prerequisite;
}

export type FeatPc = {
  id: number;
  feat?: Feat;
  level?: number;
  classFeat?: ClassFeats;
  selected?: Prerequisite;
}

export type FeatsToShow = {
  id: number | null,
  title: string,
  feat: Feat,
  modifiers?: Prerequisite,
  listOfBonus?: Prerequisite
}
