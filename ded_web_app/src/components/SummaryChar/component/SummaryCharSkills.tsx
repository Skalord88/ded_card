import { Fragment } from "react/jsx-runtime";
import {
  SummaryCharProps
} from "../SummaryChar";
import { SkillStudyTotAndBonusElement } from "../../Skills/interface/SkillStudyTotAndBonusElement";
import { TotAndBonus } from "./TotAndBonus";
import { listToShow } from "../../Prerequisite/interface/ModifierEnum";
import { FormattingText } from "../../Formatting/Function";

export const SummaryCharSkills: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const skills: SkillStudyTotAndBonusElement[] =
    modCharacter.skillsTotAndBonus || [];

    // console.log("SummaryCharSkills", skills, listToShow);

  return (
    <>
      <div>
        <p>Skills:</p>
      </div>
      <div>
        {skills &&
          skills.map((s, index) => {
            if (
              !s.studies &&
              s.list &&
              s.list.length > 0 &&
              s.list.find((l) => listToShow.includes(l.pop.name || ""))
            ) {
              return (
                <div key={index}>
                  <span>
                    {FormattingText(s.skill.skillName.name) + ": "}
                    <TotAndBonus show={true} firstSign={true} list={s.list} />
                  </span>
                </div>
              );
            }
            if (s.studies && s.studies.length > 0) {
              return (
                <div key={index}>
                  <div>
                    <span>{FormattingText(s.skill.skillName.name) + ": "}</span>
                  </div>
                  <div>
                    {s.studies.map((st, indexSt) => {
                      // if (
                      //   st.list.find((l) => listToShow.includes(l.pop.name || ""))
                      // )
                        return (
                          <Fragment key={indexSt}>
                            <span>{FormattingText(st.study.studyName.name) + ": "}</span>
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
