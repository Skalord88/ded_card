import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import {
  characterPc,
  MapOfSkills,
  serverSkill,
  SkillProps,
  skillToServer,
  Study
} from "../components/interfaces";

import { urlChar, urlSkillSet } from "../components/url";
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
  const [idStudy, setIdStudy] = useState(0);
  const [idSkill, setIdSkill] = useState(0);

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
    const totalSkillPoints = skills.reduce(
      (total, skill) =>
        !skill.classSkill
          ? total + skill.skillRank * 2
          : total + skill.skillRank,
      0
    );
    if (totalSkillPoints >= 0 || maxSkillsPoints < totalSkillPoints) {
      setActualSkillsPoints(maxSkillsPoints - totalSkillPoints);
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

  const handleAddRank = (skillToChange: number, studyToChange: number) => {
    
    setIdSkill(skillToChange);
    setIdStudy(studyToChange);

    console.log(skillToChange, studyToChange);

    if (actualSkillsPoints > 0) {
      if (studyToChange === -1) {
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill.idSkill === skillToChange
              ? skill.classSkill && skill.skillRank < maxSkillLv
                ? { ...skill, skillRank: skill.skillRank + 1 }
                : skill.skillRank < maxSkillLv / 2
                ? { ...skill, skillRank: skill.skillRank + 0.5 }
                : skill
              : skill
          )
        );
      } else {
        // let listaStudy: Study[] = [];
        // skills.map((skill) => {
        //   if (skill.idSkill === skillToChange) {
        //     listaStudy = skill.fieldOfStudy;
        //   }
        //   return listaStudy;
        // });

        // listaStudy.map((study) => {
        //   if (study.idStudy === studyToChange) {
        //     if (study.rank < maxSkillLv) {
        //       study.rank++;
        //     }
        //   }
        //   return listaStudy;
        // });

        // console.log(listaStudy);

        setSkills(
          (prevSkill) =>
            prevSkill.map((skill) =>
              skill.idSkill === skillToChange
                ? {
                    ...skill,
                    fieldOfStudy: skill.fieldOfStudy.map((study) =>
                      study.idStudy === studyToChange
                        ? { ...study, rank: study.rank++ }
                        : study
                    )
                  }
                : skill
            )
          // prevSkill.map((skill) =>
          //   skill.idSkill === skillToChange
          //     ? { ...skill,
          //        skillRank: skill.skillRank++,
          //        fieldOfStudy: listaStudy }
          //     : skill
          // )
        );
      }
    }
  };

  const handleDelRank = (e: any) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.idSkill === e[0]
          ? skill.classSkill && skill.skillRank > 0
            ? { ...skill, skillRank: skill.skillRank - 1 }
            : skill.skillRank > 0
            ? { ...skill, skillRank: skill.skillRank - 0.5 }
            : skill
          : skill
      )
    );
  };

  const handleChange = () => {
    const skillUp: skillToServer[] = [];
    let skill: serverSkill;

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
      skillUp.push(skill);
    });

    try {
      axios.post(urlSkillSet + charId, skillUp);
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
                              onClick={() => handleAddRank(s.idSkill, -1)}
                            >
                              +
                            </button>
                            <button onClick={() => handleDelRank([s.idSkill])}>
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
                  skillToChange={idSkill}
                  studyToChange={idStudy}
                  onChange={handleAddRank}
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
