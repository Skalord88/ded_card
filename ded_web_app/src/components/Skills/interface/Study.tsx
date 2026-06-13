import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Skill } from "./Skill";

export type Study = {
    id: number;
    studyName: ModifierEnum;
    skill: Skill;
    newStudy?: string;
}