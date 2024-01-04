import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { MapStudy, MapStudyUp } from "../components/MyComponents";
import {
  characterPc,
  serverSkill,
  skill,
  skillToServer,
} from "../components/interfaces";
import { urlChar, urlSkillSet } from "../components/url";
import { characterEmpty, skillEmpty, skillNull } from "../components/variables";
import "../css/style.css";

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>(characterEmpty);
  const [skills, setSkills] = useState<skill[]>([]);
  const [actualSkillsPoints, setActualSkillsPoints] = useState(0);
  const [maxSkillsPoints, setMaxSkillsPoints] = useState(0);
  const [maxSkillLv, setMaxSkillLv] = useState(0);
  const [skillsNoStudy, setSkillsNoStudy] = useState<skill[]>([]);
  const [know, setKnow] = useState<skill | undefined>(skillNull);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSkillsPoints, skills]);

  useEffect(() => {
    const skNoStudy = skills.filter((s) => ![6, 17].includes(s.idSkill));
    setSkillsNoStudy(skNoStudy);
    const kn = skills.find((k) => k.idSkill === 17);
    setKnow(kn);
  }, [skills]);

  const handleAddRank = (e: any) => {
    if (actualSkillsPoints > 0) {
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.idSkill === JSON.parse(e.target.value)
            ? skill.classSkill && skill.skillRank < maxSkillLv
              ? { ...skill, skillRank: skill.skillRank + 1 }
              : skill.skillRank < maxSkillLv / 2
              ? { ...skill, skillRank: skill.skillRank + 0.5 }
              : skill
            : skill
        )
      );
    }
  };

  const handleDelRank = (e: any) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.idSkill === JSON.parse(e.target.value)
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
    let skill: serverSkill = skillEmpty;

    skills.forEach((s) => {
      s.classSkill && s.skillRank > 0
        ? (skill = {
            idSkill: s.idSkill,
            skillRank: s.skillRank,
          })
        : (skill = {
            idSkill: s.idSkill,
            skillRank: s.skillRank * 2,
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
        {char.characterName}, skills points: {actualSkillsPoints + " "}
        <button onClick={handleChange}>set Skills</button>
      </p>
      {skills ? (
        <>
          <div className="container">
            <div className="row">
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
                    {skillsNoStudy.map((s, index) => {
                      return (
                        <div key={index}>{s.classSkill ? <>x</> : <>o</>}</div>
                      );
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.map((s, index) => {
                      return (
                        <>
                          <div key={index}>
                            {s.nameSkill}
                            <button value={s.idSkill} onClick={handleAddRank}>
                              +
                            </button>
                            <button value={s.idSkill} onClick={handleDelRank}>
                              -
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.skillRank + s.skillAbility + s.skillBonus}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    <>
                      {skillsNoStudy.map((s, index) => {
                        return <div key={index}>{s.skillRank}</div>;
                      })}
                    </>
                  </td>
                  <td>
                    {skillsNoStudy.map((s, index) => {
                      return <div key={index}>{s.skillAbility}</div>;
                    })}
                  </td>
                  <td>
                    {skillsNoStudy.map((s, index) => {
                      return <div key={index}>{s.skillBonus}</div>;
                    })}
                  </td>
                </tbody>
              </table>
            </div>
            <div className="row">
              {know ? (
                <>
                  {" "}
                  <MapStudyUp skill={know} />{" "}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
