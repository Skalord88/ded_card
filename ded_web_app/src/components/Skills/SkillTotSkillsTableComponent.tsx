import { useEffect, useState } from "react";
import { OneSkillProps } from "./interface/SkillsInterface";

export const SkillTotSkillsTableComponent: React.FC<OneSkillProps> = ({
    indexSkill,
    skill,
    updateRank
  }) => {
    const [rank, setRank] = useState<number>(skill.skillRank);

    useEffect(() => {
      setRank(skill.skillRank);
    }, [skill.skillRank]);

    const minRank = () => {
      setRank((prevRank) => {
        let newRank = prevRank;
  
        if (prevRank - 1 >= 0 && skill.classSkill) {
          newRank -= 1;
        } else if (prevRank - 0.5 >= 0) {
          newRank -= 0.5;
        }
  
        if (newRank !== prevRank) {
          updateRank(indexSkill, null, newRank);
        }
  
        return newRank;
      });
    };
  
    return (
      <div
        onClick={minRank}
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
      >
        {rank + skill.skillAbility + skill.skillBonus}
      </div>
    );
  };