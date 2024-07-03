import { useEffect, useState } from "react";
import { OneSkillProps } from "../interfaces";

export const SkillRnkSkillsTableComponent: React.FC<OneSkillProps> = ({
    indexSkill,
    skill,
    spentSkillPnts,
    maxToSpentPoints,
    maxSkillsPoints,
    updateRank
  }) => {
    const [rank, setRank] = useState<number>(skill.skillRank);

    useEffect(() => {
      setRank(skill.skillRank);
    }, [skill.skillRank]);
  
    const addRank = () => {
      if (spentSkillPnts >= maxSkillsPoints) return;
  
      let increment = skill.classSkill ? 1 : 0.5;
      let newRank = rank + increment;
  
      if (newRank <= maxToSpentPoints) {
        setRank(newRank);
        updateRank(indexSkill, null, newRank);
      }
    };
  
    return (
      <>
        <div
          onClick={addRank}
          className="rpgui-container-framed-grey-mini"
          style={{ color: "yellow" }}
        >
          {rank}
        </div>
      </>
    );
  };