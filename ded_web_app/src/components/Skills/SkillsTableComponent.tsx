import { useEffect, useState } from "react";
import { abilityAbbreviation } from "../Abilitys/Functions";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { BonusAbilities } from "../functions";
import {
  OneSkillShow,
  OneStudyShow,
  SkillWithStudy
} from "./Show/SkillShowComponent";
import { SkillsInList } from "./interface/SkillsInList";

export type SkillShowComponentProps = {
  char: CharToModify;
  onActionSkills?: () => SkillsInList[];
};

export const SkillsTableComponent: React.FC<SkillShowComponentProps> = ({
  char,
  onActionSkills
}) => {

  const [skillsList, setSkillsList] = useState<SkillsInList[]>(char.skillsList);
  const [spentSkillPnts, setSpentSkillPnts] = useState<number>(0);

  const maxSkillsPoints: number =
    char.skillsPointToSpent +
    (char.adjBonus.adjLv + char.classesLv) *
      BonusAbilities(char.abilitys, "INT");

  const maxRankToUse: number = char.adjBonus.adjLv + char.classesLv + 3;

  const updateStudyRank = (
    action: string,
    idStudy: number,
    idSkill: number
  ) => {
    const indexSkill: number = skillsList.findIndex(
      (s) => s.skill.id === idSkill
    );

    const updatedSkillsList = skillsList.map((skill, skillIndex) => {
      if (spentSkillPnts < maxSkillsPoints)
        if (skillIndex === indexSkill) {
          return {
            ...skill,
            study: skill.study?.map((study) => {
              if (study.study.id === idStudy) {
                return {
                  ...study,
                  rank:
                    action === "+"
                      ? study.rank + 1 <= maxSkillsPoints &&
                        study.rank + 1 <= maxRankToUse
                        ? study.rank + 1
                        : study.rank
                      : study.rank - 1 >= 0
                      ? study.rank - 1
                      : study.rank
                };
              }
              return study;
            })
          };
        }
      return skill;
    });
    setSkillsList(updatedSkillsList);
  };

  const updateSkillRank = (action: string, idSkill: number) => {
    const indexSkill: number = skillsList.findIndex(
      (s) => s.skill.id === idSkill
    );
    const updatedSkillsList = skillsList.map((skill, skillIndex) => {
      if (spentSkillPnts < maxSkillsPoints)
        if (skillIndex === indexSkill)
          if (skill.classSkill) {
            return {
              ...skill,
              rank:
                action === "+"
                  ? skill.rank + 1 <= maxSkillsPoints &&
                    skill.rank + 1 <= maxRankToUse
                    ? skill.rank + 1
                    : skill.rank
                  : skill.rank - 1 >= 0
                  ? skill.rank - 1
                  : skill.rank
            };
          } else {
            return {
              ...skill,
              rank:
                action === "+"
                  ? skill.rank + 0.5 <= maxSkillsPoints &&
                    skill.rank + 0.5 <= maxRankToUse / 2
                    ? skill.rank + 0.5
                    : skill.rank
                  : skill.rank - 0.5 >= 0
                  ? skill.rank - 0.5
                  : skill.rank
            };
          }
      return skill;
    });
    setSkillsList(updatedSkillsList);
  };

  useEffect(() => {
    setSpentSkillPnts(
      skillsList.reduce((tot, s) => {
        if (s.study && s.study?.length > 0) {
          return tot + s.study.reduce((subTot, st) => subTot + st.rank, 0);
        }
        return tot + (s.classSkill ? s.rank : s.rank * 2);
      }, 0)
    );
    if(onActionSkills && skillsList) {
      onActionSkills();
    }
  }, [skillsList]);

  

  const penality: number = char.inventory
    ? char.inventory.armor.penality + char.inventory.shield.penality
    : 0;
  return (
    <div>
      

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 2fr 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr",
        }}
        // className="rpgui-container-framed golden"
      >
        <div className="rpgui-container-framed-grey-mini">
          <p>cs</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>Skill</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>tot</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>rnk</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>abl</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>bns</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>pnl</p>
        </div>
        {skillsList.map((sk, index) =>
          sk.study && sk.study?.length > 0 ? (
            <>
              <SkillWithStudy
                title={sk.skill.skillName}
                key={`skillWithStudy-${index}-${sk.skill.skillName}`}
              />
              {sk.study.map((st, stIndex) => (
                <OneStudyShow
                  key={`study-${stIndex}-${st.study.studyName}`}
                  study={st}
                  skill={sk.skill}
                  bonusAb={BonusAbilities(
                    char.abilitys,
                    abilityAbbreviation(sk.skill.ability)
                  )}
                  penality={penality}
                  bonusModifier={char.skills.mono}
                  onActionStudy={updateStudyRank}
                />
              ))}
            </>
          ) : (
            <OneSkillShow
              key={`oneSkillShow-${index}-${sk.skill.skillName}`}
              sk={sk}
              bonusAb={BonusAbilities(
                char.abilitys,
                abilityAbbreviation(sk.skill.ability)
              )}
              penality={penality}
              bonusModifier={char.skills.mono}
              onActionSkill={updateSkillRank}
            />
          )
        )}
      </div>
    </div>
  );
};
{
  /* {char.skillsList.map((sk, index) =>
                    sk.study ? (
                      <> */
}
{
  /* <SkillWithStudy
                          title={sk.skill.skillName}
                          key={`skillWithStudy-${index}-${sk.skill.skillName}`}
                        /> */
}
{
  /* {sk.study.map((st, stIndex) => (
                          <OneStudyShow
                            key={`study-${stIndex}-${st.study.studyName}`}
                            study={st}
                            skill={sk.skill}
                            bonusAb={BonusAbilities(
                              char.abilitys,
                              abilityAbbreviation(sk.skill.ability)
                            )}
                            // penality={penality}
                            bonusModifier={char.skills.mono}
                          />
                        ))} */
}
{
  /* </>
                    ) : (
                      <OneSkillShow
                        key={`oneSkillShow-${index}-${sk.skill.skillName}`}
                        sk={sk}
                        bonusAb={BonusAbilities(
                          char.abilitys,
                          abilityAbbreviation(sk.skill.ability)
                        )}
                        // penality={penality}
                        bonusModifier={char.skills.mono}
                      />
                    )
                  )} */
}
{
  /* {skillsTable.map((skill: SkillProps, index: number) => {
              return (
                <>
                  <SkillSkillsTableComponent
                    key={index}
                    indexSkill={index}
                    skill={skill}
                    indexStudy={null}
                    study={null}
                    maxSkillsPoints={maxSkillsPoints}
                    spentSkillPnts={spentSkillPnts}
                    maxRankToUse={maxRankToUse}
                    abilitys={0}
                    updateRank={updateRank}
                  />
                </>
              );
            })} */
}
//     </div>
//   </>
// );
// };
//
