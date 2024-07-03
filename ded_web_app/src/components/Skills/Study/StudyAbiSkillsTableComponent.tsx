import { OneStudy } from "../../interfaces";

export const StudyAbiSkillsTableComponent: React.FC<OneStudy> = ({
    skillAbility
  }) => {
    return <div className="rpgui-container-framed-grey-mini">{skillAbility}</div>;
  };