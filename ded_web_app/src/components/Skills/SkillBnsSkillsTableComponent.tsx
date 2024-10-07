import { OneSkill } from "./interface/SkillsInterface";

export const SkillBnsSkillsTableComponent: React.FC<OneSkill> = ({ bonus }) => {
    return (
      <>
        <div 
          className="rpgui-container-framed-grey-mini" 
          style={{ color: "white" }}
          >
            {bonus}</div>
      </>
    );
  };