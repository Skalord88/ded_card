import React, { useEffect, useState } from "react";
import { MapOfSkills, SkillProps, Study } from "./interfaces";

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

export const MapUpdateOfStudy: React.FC<MapOfSkills> = ({ skills }) => {
  const [skillsList, setRank] = useState<SkillProps[]>(skills);

  const addRank = (e: any) => {

    // const lista: Study[] = skillsList.forEach((sk) => {
    //   if (sk.idSkill === e.target.value) {
    //     sk.skillRank++;
    //   }
    // });
  };

  // const minRank = (e: any) => {

  //   setRank(e.target.value--)

  // }

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
                {/* <button value={st.rank} onClick={minRank}>-</button> */}
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
