import { OneSkill } from "../interfaces";

export const SkillAbiSkillsTableComponent: React.FC<OneSkill> = ({ skill }) => {
    return (
      <>
        <div className="rpgui-container-framed-grey-mini">
          {skill.skillAbility}
        </div>
      </>
    );
  };