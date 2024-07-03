import { OneSkill } from "../interfaces";

export const SkillBnsSkillsTableComponent: React.FC<OneSkill> = ({ skill }) => {
    return (
      <>
        <div className="rpgui-container-framed-grey-mini">{skill.skillBonus}</div>
      </>
    );
  };