import React from "react";
import { MapStudy, MapOfStudyUpProps } from "./interfaces";

export const MapOfStudy: React.FC<MapStudy> = ({ mapStudy }) => {
  return (
    <div className="row">
      knowledge:
      {Object.keys(mapStudy).map((k,index) => (
        <div className="column" key={index}>
          {k} : {mapStudy[k]}
        </div>
      ))}
    </div>
  );
};

export const MapOfStudyUp: React.FC<MapOfStudyUpProps> = ({ skills }) => {

  return(
    <>
    skill:
    {Object.entries(skills.map((skill, index) => {
      <div key={index}>
        {skill.nameSkill}: {skill.skillRank + skill.skillAbility + skill.skillBonus}
      </div>
    }))}
    </>
  )
}