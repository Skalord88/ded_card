import { ShowOneSkillProps } from "../interface/SkillsInterface";


export const ShowSkillRnkSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    skill
  }) => {
  
    return (
      <>
        <div
          className="rpgui-container-framed-grey-mini"
          style={{ color: "white" }}
        >
          {skill.skillRank}
        </div>
      </>
    );
  };