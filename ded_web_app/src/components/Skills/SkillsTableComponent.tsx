import {
  OneSkill,
  OneSkillProps,
  OneStudy,
  OneStudyProps,
  SkillProps,
  Study
} from "../interfaces";
import { useEffect, useState } from "react";

export type SkillsTableProps = {
  skills: SkillProps[];
  maxSkillsPoints: number;
  maxToSpentPoints: number;
};

export const SkillsTableComponent: React.FC<SkillsTableProps> = ({
  skills,
  maxSkillsPoints,
  maxToSpentPoints
}) => {
  const [skillsTable, setSkillsTable] = useState<SkillProps[]>(skills);
  const [spentSkillPnts, setSpentSkillPnts] = useState<number>(0);

  const updateRank = (index: number, newRank: SkillProps) => {
    setSkillsTable((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = newRank;
      return updatedSkills;
    });
  };

  useEffect(() => {
    let tot = skillsTable?.reduce(
      (total, skill) =>
        skill.classSkill
          ? total + skill.skillRank
          : total + skill.skillRank * 2,
      0
    );

    tot = skillsTable?.reduce((total, skill) => {
      if (skill.fieldOfStudy.length > 0)
        skill.fieldOfStudy.forEach((study) => {
          total += study.rank;
        });
      return total;
    }, 0);

    setSpentSkillPnts(tot);
  }, [skillsTable]);

  return (
    <>
      <div>
        {maxSkillsPoints} pnts / {spentSkillPnts} spent
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5% 32% 7% 7% 7% 7%"
        }}
      >
        <div className="rpgui-container-framed-grey-mini">
          <p>cs</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>Skill</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>tot</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>rnk</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>abi</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>bns</p>
        </div>
        {skillsTable ? (
          <>
            {skillsTable.map((skill: SkillProps, index: number) => {
              return (
                <>
                  <SkillSkillsTableComponent
                    key={index}
                    skill={skill}
                    maxSkillsPoints={maxSkillsPoints}
                    maxToSpentPoints={maxToSpentPoints}
                    spentSkillPnts={spentSkillPnts}
                    updateRank={(newSkill: SkillProps) => updateRank(index, newSkill)}
                  />
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export const SkillSkillsTableComponent: React.FC<OneSkillProps> = ({
  skill,
  maxSkillsPoints,
  spentSkillPnts,
  maxToSpentPoints,
  updateRank
}) => {
  const [oneSkill, setOneSkill] = useState<SkillProps>(skill)
  const updateRankStudy = (index: number, newRank: number) => {
    setOneSkill((prevSkill) => {
      const updatedSkills = prevSkill;
      updatedSkills.fieldOfStudy[index].rank = newRank;
      return updatedSkills;
    });
  };
  return (
    <>
      {skill.fieldOfStudy.length > 0 ? (
        <>
          <ClassSkillSkillsTableComponent skill={skill} />
          <div className="rpgui-container-framed-grey-mini">
            {oneSkill.nameSkill}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {oneSkill.fieldOfStudy.map((study: Study, index: number) => {
            return (
              <>
                <div></div>
                <div className="rpgui-container-framed-grey-mini">
                  {study.study}
                </div>
                <StudyTotSkillsTableComponent
                  study={study}
                  skillAbility={skill.skillAbility}
                  skillBonus={skill.skillBonus}
                  updateRank={(newRank: number) => updateRankStudy(index, newRank)}
                />
                <StudyRnkSkillsTableComponent
                  study={study}
                  skillAbility={skill.skillAbility}
                  skillBonus={skill.skillBonus}
                  updateRank={(newRank: number) => updateRankStudy(index, newRank)}
                />
                <StudyAbiSkillsTableComponent
                  study={study}
                  skillAbility={skill.skillAbility}
                  skillBonus={skill.skillBonus}
                />
                <StudyBnsSkillsTableComponent
                  study={study}
                  skillAbility={skill.skillAbility}
                  skillBonus={skill.skillBonus}
                />
              </>
            );
          })}
        </>
      ) : (
        <>
          <ClassSkillSkillsTableComponent skill={skill} />
          <div className="rpgui-container-framed-grey-mini">
            {skill.nameSkill}
          </div>
          <SkillTotSkillsTableComponent
            skill={skill}
            maxSkillsPoints={maxSkillsPoints}
            maxToSpentPoints={maxToSpentPoints}
            spentSkillPnts={spentSkillPnts}
            updateRank={updateRank}
          />
          <SkillRnkSkillsTableComponent
            skill={skill}
            maxSkillsPoints={maxSkillsPoints}
            maxToSpentPoints={maxToSpentPoints}
            spentSkillPnts={spentSkillPnts}
            updateRank={updateRank}
          />
          <SkillAbiSkillsTableComponent skill={skill} />
          <SkillBnsSkillsTableComponent skill={skill} />
        </>
      )}
    </>
  );
};

export const ClassSkillSkillsTableComponent: React.FC<OneSkill> = ({
  skill
}) => {
  return (
    <>
      {skill.classSkill ? (
        <div key={skill.idSkill} className="rpgui-container-framed-grey-mini">
          {">"}
        </div>
      ) : (
        <div
          key={skill.idSkill}
          className="rpgui-container-framed-grey-mini"
        ></div>
      )}
    </>
  );
};

export const SkillTotSkillsTableComponent: React.FC<OneSkillProps> = ({
  skill,
  updateRank
}) => {
  const [rank, setRank] = useState<number>(skill.skillRank);

  useEffect(() => {
    setRank(skill.skillRank);
  }, [skill.skillRank]);

  const minRank = () => {
    if (rank - 1 >= 0 || rank - 0.5 >= 0) {
      setRank((prevRank) => {
        if (skill.classSkill) {
          const newRank = prevRank - 1;
          updateRank(newRank);
          return newRank;
        } else {
          const newRank = prevRank - 0.5;
          updateRank(newRank);
          return newRank;
        }
      });
    }
  };

  return (
    <div
      onClick={minRank}
      className="rpgui-container-framed-grey-mini"
      style={{ color: "orange" }}
    >
      {skill.skillRank + skill.skillAbility + skill.skillBonus}
    </div>
  );
};

export const SkillRnkSkillsTableComponent: React.FC<OneSkillProps> = ({
  skill,
  spentSkillPnts,
  maxToSpentPoints,
  maxSkillsPoints,
  updateRank
}) => {
  const [rank, setRank] = useState<number>(skill.skillRank);

  const addRank = () => {
    if (spentSkillPnts !== maxSkillsPoints)
      if (rank + 1 <= maxToSpentPoints || rank + 0.5 <= maxToSpentPoints) {
        console.log(maxToSpentPoints / 2);
        setRank((prevRank) => {
          if (skill.classSkill) {
            const newRank = prevRank + 1;
            updateRank(newRank);
            return newRank;
          } else {
            const newRank = prevRank + 0.5;
            updateRank(newRank);
            return newRank;
          }
        });
      }
  };

  useEffect(() => {
    setRank(skill.skillRank);
  }, [skill.skillRank]);

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

export const SkillAbiSkillsTableComponent: React.FC<OneSkill> = ({ skill }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey-mini">
        {skill.skillAbility}
      </div>
    </>
  );
};

export const SkillBnsSkillsTableComponent: React.FC<OneSkill> = ({ skill }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey-mini">{skill.skillBonus}</div>
    </>
  );
};

export const StudyTotSkillsTableComponent: React.FC<OneStudyProps> = ({
  study,
  skillAbility,
  skillBonus,
  updateRank
}) => {
  const [rank, setRank] = useState<number>(study.rank);
  const minRank = () => {
    setRank((prevRank) => {
      const newRank = prevRank - 1;
      updateRank(newRank);
      return newRank;
    });
  };
  return (
    <div
      className="rpgui-container-framed-grey-mini"
      style={{ color: "orange" }}
      onClick={minRank}
    >
      {rank + skillAbility + skillBonus}
    </div>
  );
};

export const StudyRnkSkillsTableComponent: React.FC<OneStudyProps> = ({
  study,
  updateRank
}) => {
  const [rank, setRank] = useState<number>(study.rank);

  const addRank = () => {
    setRank((prevRank) => {
      const newRank = prevRank + 1;
      updateRank(newRank);
      return newRank;
    });
  };

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

export const StudyAbiSkillsTableComponent: React.FC<OneStudy> = ({
  skillAbility
}) => {
  return <div className="rpgui-container-framed-grey-mini">{skillAbility}</div>;
};

export const StudyBnsSkillsTableComponent: React.FC<OneStudy> = ({
  skillBonus
}) => {
  return <div className="rpgui-container-framed-grey-mini">{skillBonus}</div>;
};
