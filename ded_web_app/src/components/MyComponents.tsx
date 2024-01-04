import React from "react";

type mapStudy = {
  mapStudy: [[string, number]];
};

type skill = {
  idSkill: number,
  nameSkill: string,
  fieldOfStudy: Map<string, number>,
  classSkill: boolean,
  skillRank: number,
  skillAbility: number,
  skillBonus: number
}

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

export const MapStudyUp: React.FC<skill> = ((sk) => {
  return (
    <table>
      <thead>
        <th>{sk.nameSkill}</th>
        <th>tot</th>
        <th>rnk</th>
        <th>abi</th>
        <th>bns</th>
      </thead>
      <tbody>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tbody>
    </table>
    )
  });
