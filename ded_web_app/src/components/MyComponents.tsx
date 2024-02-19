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
  skillToChange,
  studyToChange,
  onChange
}) => {
  const [skillsList, setRank] = useState<SkillProps[]>(skills);
  // const [newStudy, setNewStudy] = useState<AddStudy>(studyEmpty);
  // const [studySelected, setStudySelected] = useState<AddStudy[]>([]);
  const [idSkill, setIdSkill] = useState(skillToChange);
  const [idStudy, setIdStudy] = useState(studyToChange);

  useEffect(() => {
    setRank(skills);
  }, [skills]);


  const addRank = (newSkill: number, newStudy: number) => {
    setIdSkill(newSkill);
    setIdStudy(newStudy)

  };

  useEffect(() => {
    onChange(idSkill, idStudy);
    // console.log(idSkill, idStudy)
  },[idStudy])

  // ---- zostawic!
  // const handleStudyName = (e: any) => {
  //   setNewStudy({ ...newStudy, study: e.target.value });
  // };

  // const handleNewStudy = (e: any) => {
  //   setNewStudy({ ...newStudy, idSkill: e.target.vale });
  // };

  // useEffect(() => {
  //   if (newStudy.idSkill !== 0) {
  //     setStudySelected([...studySelected, newStudy]);
  //     setNewStudy({ ...newStudy, idSkill: 0, study: "" });
  //   }
  // }, [newStudy.idSkill]);
  // ---- zostawic!

  return (
    <div className="row">
      {/* {studySelected.length > 0 ? (
        <div>
          {studySelected.map((st, index) => (
            <div key={index}>
              {st.idSkill} {st.study}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )} */}
      study:
      {skillsList.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {/* <div>
              <input
                type="text"
                onChange={handleStudyName}
                placeholder="New Study"
                name="study"
                value={newStudy.study}
              ></input>
              <button onClick={handleNewStudy} value={sk.idSkill}>
                +
              </button>
            </div> */}
            {sk.fieldOfStudy.map((st, index) => (
              <>
                <div className="row" key={index}>
                  {st.study} : {st.rank}
                  <button onClick={() => addRank(sk.idSkill, st.idStudy)}>
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
