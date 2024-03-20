import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import {
  characterPc,
  MapOfSkills,
  serverSkill,
  SkillProps,
  skillToServer,
  StudyUp
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
            skill.idSkill === newStudy.idSkill && skill.skillRank < maxSkillLv
              ? {
                  ...skill,
                  skillRank: skill.skillRank++,
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
          skill.idSkill === newStudy.idSkill && skill.skillRank > 0
            ? {
                ...skill,
                skillRank: skill.skillRank--,
                fieldOfStudy: skill.fieldOfStudy.map((study) =>
                  study.idStudy === newStudy.idStudy && study.rank > 0
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
            {skillsNoStudy.skills.map((skill, index) => {
              return (
                <>
                  <div key={index}>{skill.classSkill ? <>x</> : <>o</>}</div>
                  <div key={index}>
                    <button>+</button>
                    <button>-</button>
                    {skill.nameSkill}
                  </div>
                  <div key={index}>
                    {skill.skillRank + skill.skillBonus + skill.skillAbility}
                  </div>
                  <div key={index}>{skill.skillRank}</div>
                  <div key={index}>{skill.skillBonus}</div>
                  <div key={index}>{skill.skillAbility}</div>
                </>
              );
            })}
          </div>
        </div>
        <div className="container-item">
          {skillsStudy.skills.map((skill, index) => {
            return (
              <>
                <div key={index}>{skill.nameSkill} {skill.skillBonus + skill.skillAbility}</div>
                <div>
                  {skill.fieldOfStudy.map((study, indexSt) => {
                    return(
                      <div key={indexSt}>
                        <button>+</button><button>-</button>{study.study} {study.rank}
                      </div>
                    )
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
