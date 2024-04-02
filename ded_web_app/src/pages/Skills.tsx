import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { CharacterPc, serverSkill, SkillProps } from "../components/interfaces";

import { urlChar, urlSkillSet } from "../components/url";
import "../css/style.css";

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [actualSkillsPoints, setActualSkillsPoints] = useState(0);
  const [maxSkillsPoints, setMaxSkillsPoints] = useState(0);
  const [maxSkillLv, setMaxSkillLv] = useState(0);
  const [skills, setSkills] = useState<SkillProps[]>([]);

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
        skill.classSkill
          ? total + skill.skillRank
          : total + skill.skillRank * 2,
      0
    );
    let totalStudyPoints = 0;
    skills.forEach(
      (skill) =>
        (totalStudyPoints += skill.fieldOfStudy.reduce(
          (total, study) => total + study.rank,
          0
        ))
    );

    if (
      totalSkillPoints + totalStudyPoints >= 0 ||
      maxSkillsPoints < totalSkillPoints + totalStudyPoints
    ) {
      setActualSkillsPoints(
        maxSkillsPoints - (totalSkillPoints + totalStudyPoints)
      );
    }
  }, [maxSkillsPoints, skills]);

  const handleAddRank = (skillId: number, studyId: number) => {
    if (studyId === -1) {
      setSkills((updatedSkills) =>
        updatedSkills.map((actualSkill) =>
          actualSkillsPoints > 0
            ? actualSkill.idSkill === skillId
              ? actualSkill.classSkill && actualSkill.skillRank < maxSkillLv
                ? { ...actualSkill, skillRank: actualSkill.skillRank++ }
                : actualSkill.skillRank < maxSkillLv / 2
                ? { ...actualSkill, skillRank: actualSkill.skillRank + 0.5 }
                : actualSkill
              : actualSkill
            : actualSkill
        )
      );
    } else {
      setSkills((updatedSkills) =>
        updatedSkills.map((actualSkill) =>
          actualSkillsPoints > 0
            ? actualSkill.idSkill === skillId
              ? {
                  ...actualSkill,
                  fieldOfStudy: actualSkill.fieldOfStudy.map((study) =>
                    study.idStudy === studyId && study.rank < maxSkillLv
                      ? { ...study, rank: study.rank + 1 }
                      : study
                  )
                }
              : actualSkill
            : actualSkill
        )
      );
    }
  };

  const handleDelRank = (skillId: number, studyId: number) => {

    if (studyId === -1) {
      setSkills((updatedSkills) =>
        updatedSkills.map((actualSkill) =>
          actualSkill.skillRank > 0
            ? actualSkill.idSkill === skillId
              ? actualSkill.classSkill
                ? { ...actualSkill, skillRank: actualSkill.skillRank - 1 }
                : { ...actualSkill, skillRank: actualSkill.skillRank - 0.5 }
              : actualSkill
            : actualSkill
        )
      );
    } else {
      setSkills((updatedSkills) =>
        updatedSkills.map((actualSkill) => {
          if (actualSkill.idSkill === skillId) {
            return {
              ...actualSkill,
              fieldOfStudy: actualSkill.fieldOfStudy.map((study) =>
                study.idStudy === studyId && study.rank > 0
                  ? { ...study, rank: study.rank - 1 }
                  : study
              )
            };
          }
          return actualSkill;
        })
      );
    }
  };

  const handleChange = () => {
    let skillToSend: serverSkill = {
      skillDTO: [],
      skillRank: 0
    };

    skills.forEach((skill) => {
      skillToSend.skillDTO.push(skill);
    });

    skillToSend.skillRank = actualSkillsPoints;

    try {
      axios.post(urlSkillSet + charId, skillToSend);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div className="container-item">
          skills points:{" "}
          {actualSkillsPoints + " / " + maxSkillsPoints + " / " + maxSkillLv}
          <div>
            <button onClick={handleChange}>set Skills</button>
          </div>
          <button>
            <Link to={"/feat/" + charId}>to feats</Link>
          </button>
        </div>
      </div>
      <div className="container">
        <div className="container-item">
          <div className="container-table">
            <div>CS</div>
            <div>skill</div>
            <div>tot</div>
            <div>rnk</div>
            <div>abi</div>
            <div>bns</div>
            {skills.map((skill) => {
              return (
                <>
                  {skill.fieldOfStudy.length === 0 ? (
                    <>
                      <div>{skill.classSkill ? <>x</> : <>o</>}</div>
                      <div>
                        <button
                          onClick={() => handleAddRank(skill.idSkill, -1)}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleDelRank(skill.idSkill, -1)}
                        >
                          -
                        </button>
                        {skill.nameSkill}
                      </div>
                      <div>
                        {skill.skillRank +
                          skill.skillBonus +
                          skill.skillAbility}
                      </div>
                      <div>{skill.skillRank}</div>
                      <div>{skill.skillBonus}</div>
                      <div>{skill.skillAbility}</div>
                    </>
                  ) : (
                    <>
                      <div>{skill.classSkill ? <>x</> : <>o</>}</div>
                      <div>{skill.nameSkill}</div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      {skill.fieldOfStudy.map((study) => {
                        return (
                          <>
                            <div></div>
                            <div>
                              <button
                                onClick={() =>
                                  handleAddRank(skill.idSkill, study.idStudy)
                                }
                              >
                                +
                              </button>
                              <button
                                onClick={() =>
                                  handleDelRank(skill.idSkill, study.idStudy)
                                }
                              >
                                -
                              </button>
                              {study.study}
                            </div>
                            <div>
                              {study.rank +
                                skill.skillBonus +
                                skill.skillAbility}
                            </div>
                            <div>{study.rank}</div>
                            <div>{skill.skillBonus}</div>
                            <div>{skill.skillAbility}</div>
                          </>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
