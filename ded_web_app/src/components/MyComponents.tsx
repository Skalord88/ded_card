import React, { useEffect, useState } from "react";
import {
  MapOfSkills,
  MapUpdateSkills,
  SkillProps,
  StudyUp
} from "./interfaces";

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
  studyAdd,
  studyDel,
  onRankAdd,
  onRankDel
}) => {
  const [skillsList, setRank] = useState<SkillProps[]>(skills);
    // ---- zostawic!
  // const [newStudy, setNewStudy] = useState<AddStudy>(studyEmpty);
  // const [studySelected, setStudySelected] = useState<AddStudy[]>([]);
    // ---- zostawic!
  const [studyToAdd, setToAdd] = useState<StudyUp>(studyAdd);
  const [studyToDel, setToDel] = useState<StudyUp>(studyDel);

  useEffect(() => {
    setRank(skills);
  }, [skills]);


  const addRank = (newSkill: number, newStudy: number) => {
    setToAdd({ ...studyToAdd, idSkill: newSkill, idStudy: newStudy})
  };

  const delRank = (newSkill: number, newStudy: number) => {
    setToDel({ ...studyToDel, idSkill: newSkill, idStudy: newStudy})
  };

  useEffect(() => {
    onRankAdd(studyToAdd)
  },[studyToAdd])

  useEffect(() => {
    onRankDel(studyToDel);
  },[studyToDel])

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
                  <button onClick={() => delRank(sk.idSkill, st.idStudy)}>
                    -
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
