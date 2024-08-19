import { Abilitys } from "../../interfaces";

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

export type MapStudy = {
  mapStudy: { [name: string]: any };
};

export type SkillProps = {

  idSkill: number,
  nameSkill: string,
  fieldOfStudy: Study[],
  classSkill: boolean,
  skillRank: number,
  skillBonus: number,
  skillAbility: string

}

export type OneSkill = {
  skill: SkillProps
  abilitys: number
  size: number
}

export type OneSkillProps = {
  indexSkill: number
  skill: SkillProps
  indexStudy: number | null
  study: Study | null
  maxSkillsPoints: number
  spentSkillPnts: number
  maxToSpentPoints: number
  abilitys: number
  size: number
  updateRank: (indexSkill: number, indexStudy: number | null, newRank: number) => void;
}

export type ShowTableSkillProps = {
  indexSkill: number
  skill: SkillProps
  indexStudy: number | null
  study: Study | null
  abilitys: Abilitys | null
  size: number
}

export type ShowOneSkillProps = {
  indexSkill: number
  skill: SkillProps
  indexStudy: number | null
  study: Study | null
  abilitys: number
  size: number
}

export type Study = {
  idStudy: number,
  idSkill: number,
  study: string,
  rank: number,
}

export type OneStudy = {
  study: Study
  ability: string
  skillAbility: number
  skillBonus: number
}

export type AddStudy = {
  idSkill: number,
  study: string
}

export type MapOfSkills = {
  skills: SkillProps[];
}

export type StudyUp = {
  idSkill: number, idStudy: number
}

export type MapUpdateSkills = {
  skills: SkillProps[];
  studyAdd: StudyUp;
  studyDel: StudyUp;
  onRankAdd: (
    newStudy: StudyUp) => void;
  onRankDel: (
    newStudy: StudyUp) => void;
}

export interface skillToServer {
  skillDTO: SkillProps[];
  skillPoints: number;
}