import { SkillProps } from "../../interfaces";

export type SkillDTO = {
  idSkill: number;
  skillRank: number;
  fieldOfStudy: {
    idStudy: number;
    idSkill: number;
    rank: number;
  }[];
};

export type SkillShowProps = {
  skills: SkillProps[]
}