import { Abilitys, armorClass, savingThrows } from "../../interfaces";

export type feat = {
  characterFeatName: string;
  characterFeatSpecial: string;
  characterFeatDescription: string;
}

export type serverFeat = {
  id: number;
  featName: string;
  featsType: string;
  prerequisite: Prerequisite | null;
  description: string;
}

export type Prerequisite = {
  ability: Abilitys;
  armorClass: armorClass;
  bab: number;
  classSkills: object;
  feats: string[];
  race: string;
  savingThrow: savingThrows;
};

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
