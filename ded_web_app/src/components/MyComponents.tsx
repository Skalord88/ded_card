import React, { useEffect, useState } from "react";
import {
  AddStudy,
  MapOfSkills,
  MapUpdateSkills,
  SkillProps,
  Study
} from "./interfaces";
import { studyEmpty } from "./variables";

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
  const [newStudy, setNewStudy] = useState<AddStudy>(studyEmpty);
  const [studySelected, setStudySelected] = useState<AddStudy[]>([]);

  const studio: AddStudy = studyEmpty;

  useEffect(() => {
    setRank(skills);
  }, [skills]);

  const addRank = (e: any) => {
    let listaStudy: Study[] = [];
    skillsList.map((skill) => {
      if (skill.idSkill === e[0]) {
        listaStudy = skill.fieldOfStudy;
      }
      return skill;
    });

    listaStudy.map((study) => {
      if (study.idStudy === e[1]) {
        study.rank++;
      }
      return study;
    });

    console.log(listaStudy);

    onChange(listaStudy);
  };

  const handleStudyName = (e: any) => {
    console.log(e.target.value);
    setNewStudy({ ...newStudy, study: e.target.value });
  };

  const handleNewStudy = (e: any) => {
    setNewStudy({ ...newStudy, idSkill: e.target.value });
  };

  useEffect(() => {
    if (newStudy.idSkill !== 0) setStudySelected([...studySelected, newStudy]);
  }, [newStudy.idSkill]);

  return (
    <div className="row">
      {studySelected.length > 0 ? (
        <div>
          {studySelected.map((st, index) => (
            <div key={index}>
              {st.idSkill} {st.study}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      study:
      {skillsList.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            <div>
              <input
                type="text"
                onChange={handleStudyName}
                // placeholder="New Study"
                name="study"
                value={newStudy.study}
              ></input>
              <button onClick={handleNewStudy} value={sk.idSkill}>
                +
              </button>
            </div>
            {sk.fieldOfStudy.map((st, index) => (
              <>
                <div className="row" key={index}>
                  {st.study} : {st.rank}
                  <button onClick={() => addRank([sk.idSkill, st.idStudy])}>
                    +
                  </button>
                </div>
              </>
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
