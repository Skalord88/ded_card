import { Fragment } from "react/jsx-runtime";
import { SummaryCharProps } from "../SummaryChar";
import { SkillStudyTotAndBonusElement } from "../../Skills/interface/SkillStudyTotAndBonusElement";
import { TotAndBonus, TotAndBonusElement } from "./TotAndBonus";
import {
  isBonusVisible,
  listToShow,
  ModifierType
} from "../../Prerequisite/interface/ModifierEnum";
import { FormattingText } from "../../Formatting/Function";

export const SummaryCharSkills: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const skills: SkillStudyTotAndBonusElement[] =
    modCharacter.skillsTotAndBonus || [];

  

  return (
    <>
      <div>
        <p>Skills:</p>
      </div>
      <div>
        {skills &&
          skills.map((skill, index) => {
            if (
              !skill.studies &&
              skill.list &&
              skill.list.length > 0 &&
              isBonusVisible(skill.list)
            ) {
              return (
                <div key={index}>
                  <span>
                    {FormattingText(skill.skill.skillName.name) + ": "}
                    <TotAndBonus
                      show={true}
                      firstSign={true}
                      list={skill.list}
                    />
                  </span>
                </div>
              );
            }
            if (skill.studies && skill.studies.length > 0) {
              return (
                <div key={index}>
                  <div>
                    <span>
                      {FormattingText(skill.skill.skillName.name) + ": "}
                    </span>
                  </div>
                  <div>
                    {skill.studies.map((st, indexSt) => {
                      // const lista = st.list.flatMap((l) => [l.pop.name, l.pop.text, l.pop.description]).filter((f) => f === "ABILITY_MODIFIER");

                      // console.log("lista st", st.list)
                      // console.log("listToShow", listToShow)
                      if (isBonusVisible(st.list))
                        return (
                          <Fragment key={indexSt}>
                            {/* {st.list[0].pop.name} */}
                            <span>
                              {FormattingText(st.study.studyName.name) + ": "}
                            </span>
                            <TotAndBonus
                              show={true}
                              firstSign={true}
                              list={st.list}
                            />
                          </Fragment>
                        );
                    })}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};
