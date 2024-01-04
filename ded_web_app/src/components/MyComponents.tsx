import React from "react";
import { skill } from "./interfaces";

type mapStudy = {
  mapStudy: [[string, number]];
};

export const MapStudy: React.FC<mapStudy> = ({ mapStudy }) => {
  return (
    <div className="row">
      knowledge:
      {mapStudy.map((k) => (
        <div className="column">
          {k[0]} : {k[1]}
        </div>
      ))}
    </div>
  );
};

export const MapStudyUp: React.FC<skill> = ({ skill }) => {

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
