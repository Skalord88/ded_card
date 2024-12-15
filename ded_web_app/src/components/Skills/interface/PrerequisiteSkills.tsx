import { Skill } from "./Skill";
import { Study } from "./Study";

export type PrerequisiteSkills = {
    skill: Skill;
    study: Study;
    rank: number;
}