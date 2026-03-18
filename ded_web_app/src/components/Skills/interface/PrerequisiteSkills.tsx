import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Skill } from "./Skill";
import { Study } from "./Study";

export type PrerequisiteSkills = {
    skill?: Skill;
    study?: Study;
    rank: number;
    modifierBonus?: ModifierEnum;
    target?: string[]
}