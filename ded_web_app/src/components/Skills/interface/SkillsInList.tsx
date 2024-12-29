import { Skill } from "./Skill";
import { StudyInList } from "./StudysInList";

export type SkillsInList = {
    skill: Skill,
    study?: StudyInList[],
    rank: number,
    classSkill: boolean,
    bonus: number
}