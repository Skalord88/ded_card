import { Skill } from "./Skill";

export type Study = {
    id: number;
    studyName?: string;
    skill: Skill;
    newStudy?: string;
}