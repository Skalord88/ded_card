import React, { useEffect, useState } from "react";
import { MapOfSkills, MapUpdateSkills, SkillProps, Study } from "./interfaces";

export const MapOfStudy: React.FC<MapOfSkills> = ({ skills }) => {
  return (
    <div className="row">
      study:
      {skills.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {sk.fieldOfStudy.map((st, index) => (
              <div className="row" key={index}>
                {st.study} : {sk.skillRank}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const MapUpdateOfStudy: React.FC<MapUpdateSkills> = ({
  skills,
  onChange
}) => {
  const [skillsList, setRank] = useState<SkillProps[]>(skills);

  useEffect(() => {
    console.log(skillsList)
  },[skillsList])

  const addRank = (e: any) => {
    const updatedSkillsList = skillsList.map(skill => {
      skill.fieldOfStudy.forEach(study => {
          if (study.idStudy === e.target.value) {
              study.rank++
          }
      })
      return skill; // Return the skill after updating its fieldOfStudy
  });
  console.log(updatedSkillsList)
  setRank(updatedSkillsList);
  }

  const dellRank = (e: any) => {

    const updatedSkillsList = skillsList.map(skill => {
      skill.fieldOfStudy.forEach(study => {
          if (study.idStudy === e.target.value) {
              study.rank--
          }
      })
      return skill; // Return the skill after updating its fieldOfStudy
  });
  setRank(updatedSkillsList);

  }

  // useEffect(() => {
  //   onChange(skillsList);
  
  // },[skillsList]);

  return (
    <div className="row">
      study:
      {skills.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {sk.fieldOfStudy.map((st, index) => (
              <div className="row" key={index}>
                {st.study} : {sk.skillRank}
                <button value={st.idStudy} onClick={addRank}>
                  +
                </button>
                <button value={st.rank} onClick={dellRank}>-</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const MapOfSkillsNoStudy: React.FC<MapOfSkills> = ({ skills }) => {
  return (
    <>
      skill:
      {skills.map((sk, index) => (
        <div className="row" key={index}>
          {sk.nameSkill} : {sk.skillRank + sk.skillAbility + sk.skillBonus}
        </div>
      ))}
    </>
  );
};
