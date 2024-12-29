import { abilityBackgroundColor } from "../../Abilitys/Colors";
import { OneStudy } from "../interface/SkillsInterface";

export const StudyAbiSkillsTableComponent: React.FC<OneStudy> = ({
    ability,
    skillAbility
  }) => {
    const color: string = abilityBackgroundColor(ability)
    return <div className={color}>{skillAbility}</div>;
  };