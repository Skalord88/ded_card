import { ShowOneSkillProps } from "../interface/SkillsInterface";

export const ShowStudyRnkSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
    study
  }) => {
  
    return (
      <div
        className="rpgui-container-framed-grey-mini"
      >
        {study? <>{Math.floor(study.rank)}</> : <></>}
      </div>
    );
  };