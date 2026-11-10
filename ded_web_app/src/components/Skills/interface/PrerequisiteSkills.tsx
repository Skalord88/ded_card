import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Skill } from "./Skill";
import { Study } from "./Study";

export type PrerequisiteSkills = {
    rank: number;
    skill?: Skill;
    study?: Study;
    modifierType?: ModifierEnum;
    target?: ModifierEnum[]
}