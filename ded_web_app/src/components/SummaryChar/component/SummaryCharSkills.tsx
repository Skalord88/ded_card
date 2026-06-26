import { Fragment } from "react/jsx-runtime";
import { Skill } from "../../Skills/interface/Skill";
import { Study } from "../../Skills/interface/Study";
import {
  SummaryCharProps
} from "../SummaryChar";
import { SkillStudyTotAndBonusElement } from "../../Skills/interface/SkillStudyTotAndBonusElement";
import {
  ALCHEMICAL_BONUS,
  CIRCUMSTANCE_MODIFIER,
  COMPETENCE_MODIFIER,
  INSIGHT_BONUS,
  LUCK_MODIFIER,
  ModifierEnum,
  MORALE_MODIFIER,
  PROFANE_MODIFIER,
  RACIAL_BONUS,
  RANK_VALUE,
  SACRED_MODIFIER
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonus } from "./TotAndBonus";

export const SummaryCharSkills: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const skills: SkillStudyTotAndBonusElement[] =
    modCharacter.skillsTotAndBonus || [];

  const listToShow: string[] = [
    RANK_VALUE.text,
    ALCHEMICAL_BONUS.text,
    CIRCUMSTANCE_MODIFIER.text,
    COMPETENCE_MODIFIER.text,
    INSIGHT_BONUS.text,
    LUCK_MODIFIER.text,
    MORALE_MODIFIER.text,
    PROFANE_MODIFIER.text,
    RACIAL_BONUS.text,
    SACRED_MODIFIER.text
  ];
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
              s.list.find((l) => listToShow.includes(l.text || ""))
            ) {
              return (
                <div key={index}>
                  <span>
                    {s.skill.skillName.text + ": "}
                    <TotAndBonus show={true} firstSign={true} list={s.list} />
                  </span>
                </div>
              );
            }
            if (s.studies && s.studies.length > 0) {
              return (
                <div key={index}>
                  <div>
                    <span>{s.skill.skillName.text + ": "}</span>
                  </div>
                  <div>
                    {s.studies.map((st, indexSt) => {
                      if (
                        st.list.find((l) => listToShow.includes(l.text || ""))
                      )
                        return (
                          <Fragment key={indexSt}>
                            <span>{st.study.studyName.text + ": "}</span>
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
