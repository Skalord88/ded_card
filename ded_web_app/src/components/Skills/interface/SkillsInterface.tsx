export type SkillDTO = {
  idSkill: number;
  skillRank: number;
  fieldOfStudy: {
    idStudy: number;
    idSkill: number;
    rank: number;
  }[];
};
