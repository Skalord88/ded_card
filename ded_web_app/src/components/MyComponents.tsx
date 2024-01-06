import React from "react";
import { skill } from "./interfaces";

type mapStudy = {
  mapStudy: {[name:string]:any};
};

export const MapStudy: React.FC<mapStudy> = ({ mapStudy }) => {
  return (
    <div className="row">
      knowledge:
      {Object.keys(mapStudy).map((k,index) => (
        <div className="column">
          {k} : {mapStudy[k]}
        </div>
      ))}
    </div>
  );
};

type SkillP = {
  skill:skill;
}
export const MapStudyUp: React.FC<SkillP> = ({ skill }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>
            {skill.nameSkill}
          </th>
          <th>tot</th>
          <th>rnk</th>
          <th>abi</th>
          <th>bns</th>
        </tr>
      </thead>
      <tbody>
        <td>{Object.entries(skill.fieldOfStudy).map(s => (
        <div>
          <>{s[0]} {s[1]}</>
        </div>
        ))}
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tbody>
    </table>
    )
  };
