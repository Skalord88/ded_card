import React from "react";

type MapStudy = {
  mapStudy: [[string, number]];
};

type SkillProps = {
  skill: {
    idSkill: number;
    nameSkill: string;
    fieldOfStudy: MapStudy;
    classSkill: boolean;
    skillRank: number;
    skillAbility: number;
    skillBonus: number;
  };
};

export const MapStudy: React.FC<MapStudy> = ({ mapStudy }) => {
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

export const MapStudyUp: React.FC<SkillProps> = ({ skill }) => {
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
        <>{Object.entries(skill.fieldOfStudy).map((st) => {
              <div>
                {st[0]} {st[1]}
              </div>
            })}
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
