import { ShowOneSkillProps } from "../../interfaces";

export const ShowSkillTotSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    skill
  }) => {
  
    return (
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
      >
        {skill.skillRank + skill.skillAbility + skill.skillBonus}
      </div>
    );
  };