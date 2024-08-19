import { AbilityBackgroundColor } from "../../Abilitys/Colors";
import { OneStudy } from "../interface/SkillsInterface";

export const StudyAbiSkillsTableComponent: React.FC<OneStudy> = ({
    ability,
    skillAbility
  }) => {
    const color: string = AbilityBackgroundColor(ability)
    return <div className={color}>{skillAbility}</div>;
  };