import { useEffect, useState } from "react";
import {  } from "../../interfaces";
import { OneSkillProps } from "../interface/SkillsInterface";

export const StudyTotSkillsTableComponent: React.FC<OneSkillProps> = ({
    indexSkill,
    skill,
    indexStudy,
    study,
    abilitys,
    updateRank
  }) => {
    const [rank, setRank] = useState<number>(study ? study.rank : 0);
  
    const minRank = () => {
      setRank((prevRank) => {
        const newRank = prevRank - 1;
        if (newRank >= 0) {
          updateRank(indexSkill, indexStudy, newRank);
        }
        return newRank >= 0 ? newRank : prevRank;
      });
    };
  
    useEffect(() => {
      if(study)setRank(study?.rank)
    },[study?.rank])

    return (
      <>
      {abilitys?<>
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
        onClick={minRank}
      >
        {rank + abilitys + skill.skillBonus}
      </div>
      </>:<></>}
      </>
    );
  };