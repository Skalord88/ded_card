import { Skill } from "./Skill";
import { StudyInList } from "./StudysInList";

export type SkillsInList = {
    skill: Skill,
    study?: StudyInList[],
    dbRank: number,
    rank: number,
    classSkill: boolean,
    bonus: number
}