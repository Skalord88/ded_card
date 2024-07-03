import { useEffect, useState } from "react";
import {
  OneSkillProps,
  SkillProps,
  Study,
  serverSkill
} from "../interfaces";
import { StudyTotSkillsTableComponent } from "./Study/StudyTotSkillsTableComponent";
import { ClassSkillSkillsTableComponent } from "./ClassSkillSkillsTableComponent";
import { SkillTotSkillsTableComponent } from "./SkillTotSkillsTableComponent";
import { SkillRnkSkillsTableComponent } from "./SkillRnkSkillsTableComponent";
import { SkillAbiSkillsTableComponent } from "./SkillAbiSkillsTableComponent";
import { SkillBnsSkillsTableComponent } from "./SkillBnsSkillsTableComponent";
import { StudyRnkSkillsTableComponent } from "./Study/StudyRnkSkillsTableComponent";
import { StudyAbiSkillsTableComponent } from "./Study/StudyAbiSkillsTableComponent";
import { StudyBnsSkillsTableComponent } from "./Study/StudyBnsSkillsTableComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { urlSkillSet } from "../url";

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
      let skillTotal = skill.classSkill
        ? skill.skillRank
        : skill.skillRank * 2;
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
      interface skillDTO {
        idSkill: number
        skillRank: number
        fieldOfStudy: {
          idStudy: number
          idSkill: number
          rank: number
        }[]
      };
  
      const skillsToAdd: skillDTO[] = skills?.map((skill) => {
        if (skill.fieldOfStudy.length > 0)
        return {
          idSkill: skill.idSkill,
          skillRank: 0,
          fieldOfStudy: skill.fieldOfStudy.map(
            (st) => ({
              idStudy: st.idStudy, idSkill: skill.idSkill, rank: st.rank
            })
          )
        }
        else {
          return {
          idSkill: skill.idSkill,
          skillRank: skill.skillRank,
          fieldOfStudy: []}
        }
      });

      console.log(skillsToAdd)
  
      try {
        axios.post(urlSkillSet + charId, skillsToAdd);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    };

  return (
    <>
      <div className="rpgui-container-framed-golden">
        {spentSkillPnts} spent / {maxSkillsPoints} toSpent / {maxToSpentPoints} maxRank
        <button className="rpgui-button" onClick={handleChange}><p>confirm</p></button>
        <button className="rpgui-button"><p>to Feats</p></button>
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

export const SkillSkillsTableComponent: React.FC<OneSkillProps> = ({
  indexSkill,
  skill,
  maxSkillsPoints,
  spentSkillPnts,
  maxToSpentPoints,
  updateRank
}) => {
  return (
    <>
      {skill !== null ? (
        <>
          {skill.fieldOfStudy.length > 0 ? (
            <>
              <ClassSkillSkillsTableComponent skill={skill} />
              <div className="rpgui-container-framed-grey-mini">
                {skill.nameSkill}
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              {skill.fieldOfStudy.map((study: Study, index: number) => {
                return (
                  <>
                    <div></div>
                    <div className="rpgui-container-framed-grey-mini">
                      {study.study}
                    </div>
                    <StudyTotSkillsTableComponent
                      key={indexSkill + "." + index + " Tot"}
                      indexSkill={indexSkill}
                      skill={skill}
                      indexStudy={index}
                      study={study}
                      maxSkillsPoints={maxSkillsPoints}
                      spentSkillPnts={spentSkillPnts}
                      maxToSpentPoints={maxToSpentPoints}
                      updateRank={updateRank}
                    />
                    <StudyRnkSkillsTableComponent
                      key={indexSkill + "." + index + " Rnk"}
                      indexSkill={indexSkill}
                      skill={skill}
                      indexStudy={index}
                      study={study}
                      maxSkillsPoints={maxSkillsPoints}
                      spentSkillPnts={spentSkillPnts}
                      maxToSpentPoints={maxToSpentPoints}
                      updateRank={updateRank}
                    />
                    <StudyAbiSkillsTableComponent
                      key={indexSkill + "." + index + " Abi"}
                      study={study}
                      skillAbility={skill.skillAbility}
                      skillBonus={skill.skillBonus}
                    />
                    <StudyBnsSkillsTableComponent
                      key={indexSkill + "." + index + " Bns"}
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
              <ClassSkillSkillsTableComponent
                key={indexSkill + " cs"}
                skill={skill}
              />
              <div className="rpgui-container-framed-grey-mini">
                {skill.nameSkill}
              </div>
              <SkillTotSkillsTableComponent
                key={indexSkill + " Tot"}
                indexSkill={indexSkill}
                skill={skill}
                indexStudy={null}
                study={null}
                maxSkillsPoints={maxSkillsPoints}
                maxToSpentPoints={maxToSpentPoints}
                spentSkillPnts={spentSkillPnts}
                updateRank={updateRank}
              />
              <SkillRnkSkillsTableComponent
                key={indexSkill + " Rnk"}
                indexSkill={indexSkill}
                skill={skill}
                indexStudy={null}
                study={null}
                maxSkillsPoints={maxSkillsPoints}
                maxToSpentPoints={maxToSpentPoints}
                spentSkillPnts={spentSkillPnts}
                updateRank={updateRank}
              />
              <SkillAbiSkillsTableComponent
                key={indexSkill + " Abi"}
                skill={skill}
              />
              <SkillBnsSkillsTableComponent
                key={indexSkill + " Bns"}
                skill={skill}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};