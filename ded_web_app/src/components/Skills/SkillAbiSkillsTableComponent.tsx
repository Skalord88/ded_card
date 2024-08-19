import { AbilityBackgroundColor } from "../Abilitys/Colors";
import { OneSkill } from "./interface/SkillsInterface";

export const SkillAbiSkillsTableComponent: React.FC<OneSkill> = ({
  skill,
  abilitys
}) => {
  const color: string = AbilityBackgroundColor(skill.skillAbility)
  return (
    <>
      <div className={color}>{abilitys}</div>
    </>
  );
};
