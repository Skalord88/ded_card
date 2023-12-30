import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import {
  characterPc,
  serverSkill,
  skill,
  skillToServer,
} from "../components/interfaces";
import { characterEmpty, skillEmpty } from "../components/variables";
import '../css/style.css';

export function Skills() {
  const { charId } = useParams();
  const URL = "http://localhost:8080/character-card/" + charId;
  const URLskillSet = "http://localhost:8080/skills/" + charId;

  const [char, setChar] = useState<characterPc>(characterEmpty);
  const [skills, setSkills] = useState<skill[]>([]);
  const [actualSkillsPoints, setActualSkillsPoints] = useState<number>(0);
  const [maxSkillsPoints, setMaxSkillsPoints] = useState<number>(0);
  const [maxSkillLv, setMaxSkillLv] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(URL);

        setChar(resURL.data);
        setSkills(resURL.data.skillsList);
        setMaxSkillLv(resURL.data.effectiveCharacterLv + 3)
        setMaxSkillsPoints(resURL.data.skillPoints);
        setActualSkillsPoints(resURL.data.skillPoints)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSkillsPoints]);

  // skills.forEach((s) => {setActualSkillsPoints(maxSkillsPoints - s.skillRank)})

  const handleAddRank = (e: any) => {
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
    skills.map((skill) =>
      // se id = id
      skill.idSkill === JSON.parse(e.target.value)
        ? // se class skill = true e rank < max
          skill.classSkill && skill.skillRank < maxSkillLv
          ? setActualSkillsPoints((points) => points - 1)
          : skill.skillRank < maxSkillLv / 2
          ? setActualSkillsPoints((points) => points - 1)
          : setActualSkillsPoints((points) => points)
        : setActualSkillsPoints((points) => points)
    );
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
    skills.map((skill) =>
      skill.idSkill === JSON.parse(e.target.value) &&
      actualSkillsPoints < maxSkillsPoints &&
      skill.skillRank > 0
        ? setActualSkillsPoints((points) => points + 1)
        : setActualSkillsPoints((points) => points)
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

    // console.log("skillUp:", skillUp);

    try {
      axios.post(URLskillSet, skillUp);
    } catch (error) {
      console.log(error);
    }
  };

  // const realodPage = () => window.location.reload();

  return (
    <>
      <p>
        {char.characterName}, skills points: {actualSkillsPoints}{" "}
        <button onClick={handleChange}>set Skills</button>
      </p>
      <>
        {skills ? (
            <p>
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
                    {skills.map((s, index) => {
                      return (
                        <div key={index}>{s.classSkill ? <>x</> : <>o</>}</div>
                      );
                    })}
                  </td>
                  <td>
                    {skills.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.nameSkill}
                          <button value={s.idSkill} onClick={handleAddRank}>
                            +
                          </button>
                          <button value={s.idSkill} onClick={handleDelRank}>
                            -
                          </button>
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {skills.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.skillRank + s.skillAbility + s.skillBonus}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    <>
                      {skills.map((s, index) => {
                        return (
                          <div key={index}>
                            {s.skillRank}
                          </div>
                        );
                      })}
                    </>
                  </td>
                  <td>
                    {skills.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.skillAbility}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {skills.map((s, index) => {
                      return (
                        <div key={index}>
                          {s.skillBonus}
                        </div>
                      );
                    })}
                  </td>
                </tbody>
              </table>
            </p>
        ) : (
          <div>...</div>
        )}
      </>
    </>
  );
}
