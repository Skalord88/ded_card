import React from "react";
import { MapOfSkills } from "./interfaces";

{/* <div className="row">
      knowledge:
      {Object.keys(mapStudy).map((k,index) => (
        <div className="column" key={index}>
          {k} : {mapStudy[k]}
        </div>
      ))}
    </div> */}

export const MapOfStudy: React.FC<MapOfSkills> = ({ skills }) => {
  return (
    <div className="row">
      study:
        {skills.map((sk, index) => (
            <div className="container">
            {sk.nameSkill}
            {Object.entries(sk.fieldOfStudy).map(st => 
              <>
              {st[0]} : {st[1]}
              </>
              )}
            </div>
        ))}
    </div>
  );
};

export const MapOfSkillsNoStudy: React.FC<MapOfSkills> = ({ skills }) => {

  return(
    <>
    skill:
    {skills.map((sk,index) => (
      <div className="row" key={index}>
        {sk.nameSkill} : {sk.skillRank + sk.skillAbility + sk.skillBonus}
      </div>
    ))}
    </>
  )
}