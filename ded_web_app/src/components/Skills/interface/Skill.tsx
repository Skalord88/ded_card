import { AbilityEnum } from "../../Abilitys/AbilityEnum";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";

export type Skill = {
    id: number;
    skillName: ModifierEnum;
    ability: AbilityEnum;
    penality: number;
}