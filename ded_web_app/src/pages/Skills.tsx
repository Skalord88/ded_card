import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { CharacterPc } from "../components/interfaces";

import { abilityBackgroundColor } from "../components/Abilitys/Colors";
import { abilityAbbreviation } from "../components/Abilitys/Functions";
import { FormattingText } from "../components/Formatting/Function";
import { BonusAbilities, SignNumber } from "../components/functions";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { Skill } from "../components/Skills/interface/Skill";
import { SkillsInList } from "../components/Skills/interface/SkillsInList";
import { urlChar, urlSkillSet } from "../components/url";
import "../css/style.css";
import { PageLayout } from "./AppLayout";
import { Study } from "../components/Skills/interface/SkillsInterface";
import { Abilitys } from "../components/Abilitys/Interface";
import { StudyInList } from "../components/Skills/interface/StudysInList";

export type SkillToAdd = {
  idSkill: number;
  idStudy: number;
  rank: number;
};

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [skillsList, setSkillsList] = useState<SkillsInList[]>();
  const [skillsToAdd, setSkillsToAdd] = useState<SkillToAdd[]>([]);
  const [change, setChange] = useState(false);

  const [maxSkillsPoints, setMaxSkillsPoints] = useState<number>(0);
  // totale dei skillPnts del char

  const [maxRankToUse, setMaxRankToUse] = useState<number>(0);
  // massimo dei punti spendibili 3 + lv

  const [spentSkillsPnt, setSpentSkillsPnt] = useState<number>(0);
  // totale dei punti spesi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        setChar(resURL.data);
        const moddedChar: CharToModify = createModChar(resURL.data);
        setModChar(moddedChar);
        setSkillsList(moddedChar.skillsList);

        setMaxSkillsPoints(moddedChar.skillsPointToSpent);
        setMaxRankToUse(moddedChar.adjBonus.adjLv + moddedChar.classesLv + 3);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skillsList) {
      const skillToSend: SkillToAdd[] = skillsList?.flatMap((skill) =>
        skill.study && skill.study.length > 0
          ? skill.study.flatMap((st) =>
              st.rank !== st.dbRank
                ? [{ idSkill: skill.skill.id, idStudy: st.study.id, rank: st.rank }]
                : []
            )
          : skill.rank !== skill.dbRank
          ? [{ idSkill: skill.skill.id, idStudy: 0, rank: skill.rank }]
          : []
      );
      setSkillsToAdd(skillToSend);
    }
  }, [skillsList]);

  useEffect(() => {
    if (skillsList) {
      const totRanks: number = skillsList.reduce(
        (tot, s) =>
          tot +
          (s.classSkill ? s.rank : s.rank * 2) +
          (s.study?.reduce((stTot, st) => stTot + st.rank, 0) ?? 0),
        0
      );
      setSpentSkillsPnt(totRanks);
    }
  }, [skillsList]);

  const handleAddSkill = (skill?: SkillsInList, study?: StudyInList) => {
    if (skill && !study) {
      if (maxSkillsPoints && maxSkillsPoints - 1 >= 0) {
        if (skill.classSkill && skill.rank + 1 <= maxRankToUse) {
          setMaxSkillsPoints(maxSkillsPoints - 1);
          setSkillsList((prevSkills) =>
            prevSkills?.map((s) => {
              if (s.skill.id === skill.skill.id) {
                return {
                  ...s,
                  rank: s.rank + 1
                };
              }
              return s;
            })
          );
        }
        if (!skill.classSkill && skill.rank + 0.5 <= maxRankToUse / 2) {
          setMaxSkillsPoints(maxSkillsPoints - 1);
          setSkillsList((prevSkills) =>
            prevSkills?.map((s) => {
              if (s.skill.id === skill.skill.id) {
                return {
                  ...s,
                  rank: s.rank + 0.5
                };
              }
              return s;
            })
          );
        }
      }
    }
    if (!skill && study) {
      if (maxSkillsPoints && maxSkillsPoints - 1 >= 0) {
        if (study.rank + 1 <= maxRankToUse) {
          setMaxSkillsPoints(maxSkillsPoints - 1);
          setSkillsList((prevSkills) =>
            prevSkills?.map((s) => {
              return {
                ...s,
                study: s.study?.map((st) => {
                  if (st.study.id === study.study.id) {
                    return {
                      ...st,
                      rank: st.rank + 1
                    };
                  }
                  return st;
                })
              };
            })
          );
        }
      }
    }
  };

  const handleDelSkill = (skill?: SkillsInList, study?: StudyInList) => {
    if (skill && !study) {
      if (skill.classSkill && skill.rank - 1 >= 0) {
        setMaxSkillsPoints(maxSkillsPoints + 1);
        setSkillsList((prevSkills) =>
          prevSkills?.map((s) => {
            if (s.skill.id === skill.skill.id) {
              return {
                ...s,
                rank: s.rank - 1
              };
            }
            return s;
          })
        );
      }
      if (!skill.classSkill && skill.rank - 0.5 >= 0) {
        setMaxSkillsPoints(maxSkillsPoints + 1);
        setSkillsList((prevSkills) =>
          prevSkills?.map((s) => {
            if (s.skill.id === skill.skill.id) {
              return {
                ...s,
                rank: s.rank - 0.5
              };
            }
            return s;
          })
        );
      }
    }
    if (!skill && study) {
      if (study.rank - 1 >= 0) {
        setMaxSkillsPoints(maxSkillsPoints + 1);
        setSkillsList((prevSkills) =>
          prevSkills?.map((s) => {
            return {
              ...s,
              study: s.study?.map((st) => {
                if (st.study.id === study.study.id) {
                  return {
                    ...st,
                    rank: st.rank - 1
                  };
                }
                return st;
              })
            };
          })
        );
      }
    }
  };

  const handleSubmit = () => {
    try {
      if (skillsToAdd.length > 0) {
        axios.post(urlSkillSet + charId, skillsToAdd);
      }
      console.log(skillsToAdd);
      setChange(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout
      title={"Skills"}
      pageStyle="auto"
      onAction={handleSubmit}
      buttons={{
        back: { text: "Classes", link: "/class/" + charId  },
        next: { text: "Feats", link: "/feat/" + charId, change: change }
      }}
    >
      {
        <SkillsPointsToSpend
          spentSkillPnts={spentSkillsPnt}
          maxSkillsPoints={maxSkillsPoints}
          maxRankToUse={maxRankToUse}
        />
      }
      {modChar &&
        skillsList &&
        skillsList.map((skill, index) =>
          skill.study && skill.study?.length > 0 ? (
            skill.study.map((study, indexStudy) => (
              <SkillStudyElement
                key={indexStudy + "." + study.study.studyName}
                index={indexStudy}
                // skill={skill}
                study={study}
                ability={modChar.abilitys}
                onActionAdd={handleAddSkill}
                onActionDel={handleDelSkill}
              />
            ))
          ) : (
            <SkillStudyElement
              key={index + "." + skill.skill.skillName}
              index={index}
              skill={skill}
              ability={modChar.abilitys}
              onActionAdd={handleAddSkill}
              onActionDel={handleDelSkill}
            />
          )
        )}

      {/* {char && modChar ? ( */}
      {/* <div> */}
      {/* <SkillsTableComponent key={"skillsTable"} char={modChar} onActionSkills={() => handleChange}/> */}
      {/* <CharSummary character={char} /> */}
      {/* </div> */}
      {/* ) : null} */}
    </PageLayout>
  );
}

export type SkillStudyElementProps = {
  index: number;
  skill?: SkillsInList;
  study?: StudyInList;
  ability: Abilitys;
  onActionAdd: (skill?: SkillsInList, study?: StudyInList) => void;
  onActionDel: (skill?: SkillsInList, study?: StudyInList) => void;
};

export const SkillStudyElement: React.FC<SkillStudyElementProps> = ({
  index,
  skill,
  study,
  ability,
  onActionAdd,
  onActionDel
}) => {
  const isClassSkill: boolean = skill
    ? skill?.classSkill
    : study
    ? true
    : false;
  const skillAbility = skill ? skill.skill.ability : "";
  const skillAbilityNumber: number = BonusAbilities(
    ability,
    abilityAbbreviation(skillAbility)
  );
  const idSkill: number | undefined = skill ? skill.skill.id : undefined;
  const idStudy: number | undefined = study ? study.study.id : undefined;
  const skillRank: number = (study?.rank ?? 0) + (skill?.rank ?? 0);
  const skillBonus: number = skill?.bonus ?? 0;
  const skillName: string =
    study?.study.studyName || skill?.skill.skillName || "";
  const tot: number = Math.floor(
    (skill?.rank ?? 0) +
      (skill?.bonus ?? 0) +
      (study?.rank ?? 0) +
      skillAbilityNumber
  );
  const signTot: string = SignNumber(tot) + tot;

  const toSendSkill: [SkillsInList | undefined, StudyInList | undefined] = study
    ? [undefined, study]
    : [skill, undefined];

  const skillText: (string | null)[] = [
    FormattingText(skillName),
    "rank" + SignNumber(skillRank) + skillRank,
    skillBonus > 0 ? SignNumber(skillBonus) + skillBonus : null,
    abilityAbbreviation(skillAbility) +
      SignNumber(skillAbilityNumber) +
      skillAbilityNumber
  ];

  return (
    <div key={index + "." + idSkill + idStudy}>
      <div
        className={abilityBackgroundColor(isClassSkill, skillAbility)}
        style={{
          display: "flex",
          placeItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h1
          className="rpgui-cursor-point"
          onClick={() => onActionDel(toSendSkill[0], toSendSkill[1])}
        >
          {signTot}
        </h1>
        <div
          className="rpgui-cursor-point"
          onClick={() => onActionAdd(toSendSkill[0], toSendSkill[1])}
        >
          <p>{skillText.filter((t) => t).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export type SkillsPointsToSpendProps = {
  spentSkillPnts: number;
  maxSkillsPoints: number;
  maxRankToUse: number;
};

export const SkillsPointsToSpend: React.FC<SkillsPointsToSpendProps> = ({
  spentSkillPnts,
  maxSkillsPoints,
  maxRankToUse
}) => {
  return (
    <div
      style={{ display: "flex", position: "sticky", top: "0.5rem", right: "0.5rem" }}
      className="rpgui-container-framed golden"
    >
      <p>{spentSkillPnts} spent/</p>
      <p>{maxSkillsPoints} toSpent/</p>
      <p>
        {maxRankToUse}
        {" maxRank"}
      </p>
    </div>
  );
};
