import React from "react";
import { MapStudy, SkillProps } from "./interfaces";

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

export const MapOfStudyUp: React.FC<SkillProps> = ({ skill }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>{skill.nameSkill}</th>
          <th>tot</th>
          <th>rnk</th>
          <th>abi</th>
          <th>bns</th>
        </tr>
      </thead>
      <tbody>
        <td>
        <>
        <MapOfStudy mapStudy={skill.fieldOfStudy}/>
        </>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tbody>
    </table>
  );
};

