import { OneStudy } from "../../interfaces";

export const StudyBnsSkillsTableComponent: React.FC<OneStudy> = ({
    skillBonus
  }) => {
    return <div className="rpgui-container-framed-grey-mini">{skillBonus}</div>;
  };