import { useEffect, useState } from "react";
import { OneSkillProps } from "../../interfaces";

export const StudyRnkSkillsTableComponent: React.FC<OneSkillProps> = ({
    indexSkill,
    indexStudy,
    study,
    spentSkillPnts,
    maxSkillsPoints,
    maxToSpentPoints,
    updateRank
  }) => {
    const [rank, setRank] = useState<number>(study ? study.rank : 0);
  
    const addRank = () => {
      if (spentSkillPnts < maxSkillsPoints && rank < maxToSpentPoints) {
        setRank((prevRank) => {
          const newRank = prevRank + 1;
          updateRank(indexSkill, indexStudy, newRank);
          return newRank;
        });
      }
    };

    useEffect(() => {
      if(study)setRank(study?.rank)
    },[study?.rank])
  
    return (
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "yellow" }}
        onClick={addRank}
      >
        {rank}
      </div>
    );
  };