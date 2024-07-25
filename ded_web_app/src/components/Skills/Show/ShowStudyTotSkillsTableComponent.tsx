import { ShowOneSkillProps } from "../../interfaces";

export const ShowStudyTotSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    skill,
    study
  }) => {

    return (
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
      >
        {study? <>{study.rank + skill.skillAbility + skill.skillBonus} </> : <></>}
      </div>
    );
  };