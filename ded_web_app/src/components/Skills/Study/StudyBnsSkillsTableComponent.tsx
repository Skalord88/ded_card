import { OneStudy } from "../interface/SkillsInterface";

export const StudyBnsSkillsTableComponent: React.FC<OneStudy> = ({
    skillBonus
  }) => {
    return <div className="rpgui-container-framed-grey-mini">{skillBonus}</div>;
  };