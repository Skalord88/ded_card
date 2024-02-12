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
  const [skillsList, setRank] = useState<SkillProps[]>([]);

  useEffect(() => {
    setRank(skills)
  },[skills])

  const addRank = (e: any) => {
    console.log(e[0], e[1])
    let listaStudy: Study[] = [];
    skillsList.map((skill) => {
      if (skill.idSkill === e[0]) {
        listaStudy = skill.fieldOfStudy;
      } return skill;
    });

    listaStudy.map((study) => {
      if(study.idStudy === e[1]) {
        study.rank ++;
      } return study;
    });

    setRank((prevStudy) =>
      prevStudy.map((skill) =>
        skill.idSkill === e[0]
          ? { ...skill, fieldOfStudy: listaStudy }
          : skill
      )
    );
  };

  return (
    <div className="row">
      study:
      {skillsList.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {sk.fieldOfStudy.map((st, index) => (
              <div className="row" key={index}>
                {sk.idSkill} {st.idStudy} {st.study} : {sk.skillRank}
                <button onClick={() => addRank([sk.idSkill, st.idStudy])}>
                  +
                </button>
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
