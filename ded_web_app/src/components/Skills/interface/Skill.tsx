import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";

export type Skill = {
    id: number;
    skillName: ModifierEnum;
    ability: string;
    penality: number;
}