import { ShowOneSkillProps } from "../../interfaces";

export const ShowSkillRnkSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    skill
  }) => {
  
    return (
      <>
        <div
          className="rpgui-container-framed-grey-mini"
        >
          {skill.skillRank}
        </div>
      </>
    );
  };