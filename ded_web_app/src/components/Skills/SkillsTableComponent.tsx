import { useEffect, useState } from "react";
import { SkillProps } from "../interfaces";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { urlSkillSet } from "../url";
import { SkillDTO } from "./interface/SkillsInterface";
import { SkillSkillsTableComponent } from "./SkillSkillsTableComponent";

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
  const { charId } = useParams();
  const [skillsTable, setSkillsTable] = useState<SkillProps[]>(skills);
  const [spentSkillPnts, setSpentSkillPnts] = useState<number>(0);

  const updateRank = (
    indexSkill: number,
    indexStudy: number | null,
    newRank: number
  ) => {
    setSkillsTable((prevSkills) => {
      const updatedSkills = [...prevSkills];

      if (indexStudy === null) {
        updatedSkills[indexSkill].skillRank = newRank;
      } else {
        updatedSkills[indexSkill].fieldOfStudy[indexStudy].rank = newRank;
      }
      return updatedSkills;
    });
  };

  useEffect(() => {
    const tot = skillsTable.reduce((total, skill) => {
      let skillTotal = skill.classSkill ? skill.skillRank : skill.skillRank * 2;
      if (skill.fieldOfStudy.length > 0) {
        skill.fieldOfStudy.forEach((study) => {
          skillTotal += study.rank;
        });
      }
      return total + skillTotal;
    }, 0);

    setSpentSkillPnts(tot);
  }, [skillsTable]);

  const handleChange = () => {
    const mapSkillsToDTO: SkillDTO[] = skills?.map((skill) => {
      if (skill.fieldOfStudy.length > 0)
        return {
          idSkill: skill.idSkill,
          skillRank: 0,
          fieldOfStudy: skill.fieldOfStudy.map((st) => ({
            idStudy: st.idStudy,
            idSkill: skill.idSkill,
            rank: st.rank
          }))
        };
      else {
        return {
          idSkill: skill.idSkill,
          skillRank: skill.skillRank,
          fieldOfStudy: []
        };
      }
    });

    const skillDTO: { skillDTO: SkillDTO[] } = { skillDTO: mapSkillsToDTO };

    console.log(skillDTO);

    try {
      axios.post(urlSkillSet + charId, skillDTO);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="rpgui-container-framed-golden">
        {spentSkillPnts} spent / {maxSkillsPoints} toSpent / {maxToSpentPoints}{" "}
        maxRank
        <button className="rpgui-button" onClick={handleChange}>
          <p>confirm</p>
        </button>
        <Link to={"/feat/" + charId}>
          <button className="rpgui-button">
            <p>to Feats</p>
          </button>
        </Link>
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
                    indexSkill={index}
                    skill={skill}
                    indexStudy={null}
                    study={null}
                    maxSkillsPoints={maxSkillsPoints}
                    spentSkillPnts={spentSkillPnts}
                    maxToSpentPoints={maxToSpentPoints}
                    updateRank={updateRank}
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