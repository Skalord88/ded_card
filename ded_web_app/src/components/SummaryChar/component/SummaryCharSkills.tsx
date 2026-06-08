import { Skill } from "../../Skills/interface/Skill";
import { Study } from "../../Skills/interface/Study";
import { SummaryCharProps, TotAndBonus, TotAndBonusElement } from "../SummaryChar";

export const SummaryCharSkills: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {

    const skills: {skill: Skill | Study, list:TotAndBonusElement[]}[] = modCharacter.skillsTotAndBonus || [];
  return (
    <>
      <div>
        <p>Skills:</p>
      </div>
      <div>
        {skills && skills.map((s, index) => {
          if(s.list.length > 0) return (
            <p key={index}>
            {"skillName" in s.skill && (<span>{s.skill.skillName.text}{" "}</span>)}
            {"studyName" in s.skill && (<span>{s.skill.studyName}{" "}</span>)}
            <TotAndBonus show={true} firstSign={true} list={s.list} />
            </p>
          )
        })}
      </div>
    </>
  );
};
