import { OneSkill } from "../interfaces";

export const ClassSkillSkillsTableComponent: React.FC<OneSkill> = ({
    skill
  }) => {
    return (
      <>
        {skill.classSkill ? (
          <div key={skill.idSkill} className="rpgui-container-framed-grey-mini">
            {">"}
          </div>
        ) : (
          <div
            key={skill.idSkill}
            className="rpgui-container-framed-grey-mini"
          ></div>
        )}
      </>
    );
  };