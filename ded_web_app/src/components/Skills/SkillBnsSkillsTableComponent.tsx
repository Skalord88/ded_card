import { OneSkill } from "./interface/SkillsInterface";

export const SkillBnsSkillsTableComponent: React.FC<OneSkill> = ({ skill, size }) => {
    return (
      <>
        <div className="rpgui-container-framed-grey-mini">{skill.skillBonus + size}</div>
      </>
    );
  };