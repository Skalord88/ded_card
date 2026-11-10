import { AbilityEnum } from "../../Abilitys/AbilityEnum";
import { ModifierEnum, ModifierType } from "../../Prerequisite/interface/ModifierEnum";

export type Skill = {
    id: number;
    skillName: ModifierEnum;
    ability: AbilityEnum;
    penality: number;
}