import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import {
  characterPc,
  MapOfSkills,
  serverSkill,
  ServerStudy,
  SkillProps,
  skillToServer,
  StudyUp
} from "../components/interfaces";

import { urlChar, urlSkillSet, urlStudySet } from "../components/url";
import "../css/style.css";
import { MapUpdateOfStudy } from "../components/MyComponents";

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();
  const [actualSkillsPoints, setActualSkillsPoints] = useState(0);
  const [maxSkillsPoints, setMaxSkillsPoints] = useState(0);
  const [maxSkillLv, setMaxSkillLv] = useState(0);
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [skillsStudy, setSkillsStudy] = useState<MapOfSkills>({ skills });
  const [skillsNoStudy, setSkillsNoStudy] = useState<MapOfSkills>({ skills });
  const [studyToAdd, setStudyToAdd] = useState<StudyUp>({
    idSkill: 0,
    idStudy: 0
  });
  const [studyToDel, setStudyToDel] = useState<StudyUp>({
    idSkill: 0,
    idStudy: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);

        setChar(resURL.data);
        setSkills(resURL.data.skillsList);
        setMaxSkillLv(resURL.data.effectiveCharacterLv + 3);
        setMaxSkillsPoints(resURL.data.skillPoints);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let totalSkillPoints = skills.reduce(
      (total, skill) =>
        !skill.classSkill
          ? total + skill.skillRank * 2
          : total + skill.skillRank,
      0
    );

    let totalStudyPoints = 0;
    skills.forEach(
      (skill) => 
      skill.fieldOfStudy.length > 0
      ? totalStudyPoints = skill.fieldOfStudy.reduce(
        (totalSt, study) => 
        totalSt + study.rank, 0
      )
      : 0
    )

    console.log(totalSkillPoints);

    if (totalSkillPoints >= 0 || maxSkillsPoints < totalSkillPoints) {
      setActualSkillsPoints(maxSkillsPoints - totalSkillPoints - totalStudyPoints);
    }
  }, [maxSkillsPoints, skills]);

  useEffect(() => {
    const skStudy: SkillProps[] = skills.filter((sk) =>
      [6, 17, 21].includes(sk.idSkill)
    );

    const skNoStudy: SkillProps[] = skills.filter(
      (sk) => ![6, 17, 21].includes(sk.idSkill)
    );

    const mapStudy: MapOfSkills = { skills: skStudy };
    setSkillsStudy(mapStudy);

    const mapNoStudy: MapOfSkills = { skills: skNoStudy };
    setSkillsNoStudy(mapNoStudy);
  }, [skills]);

  const handleAddRank = (newStudy: StudyUp) => {
    setStudyToAdd(newStudy);

    if (actualSkillsPoints > 0) {
      if (newStudy.idStudy === -1) {
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill.idSkill === newStudy.idSkill
              ? skill.classSkill && skill.skillRank < maxSkillLv
                ? { ...skill, skillRank: skill.skillRank++ }
                : skill.skillRank < maxSkillLv / 2
                ? { ...skill, skillRank: skill.skillRank + 0.5 }
                : skill
              : skill
          )
        );
      } else {
        setSkills((prevSkill) =>
          prevSkill.map((skill) =>
            skill.idSkill === newStudy.idSkill
              //  && skill.skillRank < maxSkillLv
              ?  {
                  ...skill,
                  // skillRank: skill.skillRank++,
                  fieldOfStudy: skill.fieldOfStudy.map((study) =>
                    study.idStudy === newStudy.idStudy &&
                    study.rank < maxSkillLv
                      ? { ...study, rank: study.rank++ }
                      : study
                  )
                }
              : skill
          )
        );
      }
      setStudyToAdd({ ...studyToAdd, idSkill: 0, idStudy: 0 });
    }
  };

  const handleDelRank = (newStudy: StudyUp) => {
    setStudyToDel(newStudy);
    if (newStudy.idStudy === -1) {
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.idSkill === newStudy.idSkill
            ? skill.classSkill && skill.skillRank > 0
              ? { ...skill, skillRank: skill.skillRank-- }
              : skill.skillRank > 0
              ? { ...skill, skillRank: skill.skillRank - 0.5 }
              : skill
            : skill
        )
      );
    } else {
      setSkills((prevSkill) =>
        prevSkill.map((skill) =>
          skill.idSkill === newStudy.idSkill
          //  && skill.skillRank > 0
            ? {
                ...skill,
                // skillRank: skill.skillRank--,
                fieldOfStudy: skill.fieldOfStudy.map((study) =>
                  study.idStudy === newStudy.idStudy
                   && study.rank > 0
                    ? { ...study, rank: study.rank-- }
                    : study
                )
              }
            : skill
        )
      );
    }
    setStudyToDel({ ...studyToAdd, idSkill: 0, idStudy: 0 });
  };

  const handleChange = () => {
    const skillUp: skillToServer[] = [];
    let skill: serverSkill;

    const studyToServer: ServerStudy[] = [];
    let studyServer: ServerStudy;

    skills.forEach((s) => {
      s.classSkill && s.skillRank > 0
        ? (skill = {
            idSkill: s.idSkill,
            skillRank: s.skillRank
          })
        : (skill = {
            idSkill: s.idSkill,
            skillRank: s.skillRank * 2
          });
      if (s.fieldOfStudy.length > 0)
        s.fieldOfStudy.forEach((study) => {
          studyServer = {
            idStudy: study.idStudy,
            idSkill: study.idSkill,
            rank: study.rank
          };
          studyToServer.push(studyServer);

          console.log(studyServer);
        });

      skillUp.push(skill);
    });

    try {
      axios.post(urlSkillSet + charId, skillUp);
    } catch (error) {
      console.log(error);
    }

    try {
      axios.post(urlStudySet + charId, studyToServer)
      console.log(studyToServer);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <>
      <p>
        {char?.characterName}, skills points:{" "}
        {actualSkillsPoints +
          " / " +
          maxSkillsPoints +
          " / " +
          maxSkillLv +
          " "}
        <button onClick={handleChange}>set Skills</button>
      </p>
      {skills ? (
        <>
          <div className="container">
            <div className="column">
              <table>
                <thead>
                  <th>CS</th>
                  <th>skill</th>
                  <th>tot</th>
                  <th>rnk</th>
                  <th>abi</th>
                  <th>bns</th>
                </thead>
                <tbody>
                  <td>
                    {skillsNoStudy.skills.map((s, index) => {
                      return (
                        <div key={index}>{s.classSkill ? <>x</> : <>o</>}</div>
                      );
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.skills.map((s, index) => {
                      return (
                        <>
                          <div key={index}>
                            {s.nameSkill}
                            <button
                              onClick={() =>
                                handleAddRank({
                                  idSkill: s.idSkill,
                                  idStudy: -1
                                })
                              }
                            >
                              +
                            </button>
                            <button
                              onClick={() =>
                                handleDelRank({
                                  idSkill: s.idSkill,
                                  idStudy: -1
                                })
                              }
                            >
                              -
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.skills.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.skillRank + s.skillAbility + s.skillBonus}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    <>
                      {skillsNoStudy.skills.map((s, index) => {
                        return <div key={index}>{s.skillRank}</div>;
                      })}
                    </>
                  </td>
                  <td>
                    {skillsNoStudy.skills.map((s, index) => {
                      return <div key={index}>{s.skillAbility}</div>;
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.skills.map((s, index) => {
                      return <div key={index}>{s.skillBonus}</div>;
                    })}
                  </td>
                </tbody>
              </table>
            </div>
            <div className="column">
              <table>
                <MapUpdateOfStudy
                  skills={skillsStudy.skills}
                  studyAdd={studyToAdd}
                  studyDel={studyToDel}
                  onRankAdd={handleAddRank}
                  onRankDel={handleDelRank}
                />
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
