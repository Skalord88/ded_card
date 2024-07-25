import { ShowOneSkillProps } from "../../interfaces";

export const ShowStudyRnkSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    study
  }) => {
  
    return (
      <div
        className="rpgui-container-framed-grey-mini"
      >
        {study? <>{study.rank}</> : <></>}
      </div>
    );
  };