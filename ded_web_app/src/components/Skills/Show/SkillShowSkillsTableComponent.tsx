import { ShowOneSkillProps, Study } from "../../interfaces";
import { D20Popup } from "../../Popup/DicePopup/D20Popup";
import { ClassSkillSkillsTableComponent } from "../ClassSkillSkillsTableComponent";
import { SkillAbiSkillsTableComponent } from "../SkillAbiSkillsTableComponent";
import { SkillBnsSkillsTableComponent } from "../SkillBnsSkillsTableComponent";
import { StudyAbiSkillsTableComponent } from "../Study/StudyAbiSkillsTableComponent";
import { StudyBnsSkillsTableComponent } from "../Study/StudyBnsSkillsTableComponent";
import { ShowSkillRnkSkillsTableComponent } from "./ShowSkillRnkSkillsTableComponent";
import { ShowSkillTotSkillsTableComponent } from "./ShowSkillTotSkillsTableComponent";
import { ShowStudyRnkSkillsTableComponent } from "./ShowStudyRnkSkillsTableComponent";
import { ShowStudyTotSkillsTableComponent } from "./ShowStudyTotSkillsTableComponent";

export const SkillShowSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
  indexSkill,
  skill
}) => {
  return (
    <>
      {skill !== null ? (
        <>
          {skill.fieldOfStudy.length > 0 ? (
            <>
              <ClassSkillSkillsTableComponent skill={skill} />
              <div className="rpgui-container-framed-grey-mini">
                {skill.nameSkill}
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              {skill.fieldOfStudy.map((study: Study, index: number) => {
                return (
                  <>
                    <div></div>
                    <div className="rpgui-container-framed-grey-mini">
                      <D20Popup textOrWeapon={study.study} value={study.rank + skill.skillAbility} />
                    </div>
                    <ShowStudyTotSkillsTableComponent
                      key={indexSkill + "." + index + " Tot"}
                      indexSkill={indexSkill}
                      skill={skill}
                      indexStudy={index}
                      study={study}
                    />
                    <ShowStudyRnkSkillsTableComponent
                      key={indexSkill + "." + index + " Rnk"}
                      indexSkill={indexSkill}
                      indexStudy={index}
                      study={study}
                      skill={skill}
                    />
                    <StudyAbiSkillsTableComponent
                      key={indexSkill + "." + index + " Abi"}
                      study={study}
                      skillAbility={skill.skillAbility}
                      skillBonus={skill.skillBonus}
                    />
                    <StudyBnsSkillsTableComponent
                      key={indexSkill + "." + index + " Bns"}
                      study={study}
                      skillAbility={skill.skillAbility}
                      skillBonus={skill.skillBonus}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <>
              <ClassSkillSkillsTableComponent
                key={indexSkill + " cs"}
                skill={skill}
              />
              <div className="rpgui-container-framed-grey-mini">
                <D20Popup textOrWeapon={skill.nameSkill} value={skill.skillRank + skill.skillAbility + skill.skillBonus} />
              </div>
              <ShowSkillTotSkillsTableComponent
                key={indexSkill + " Tot"}
                indexSkill={indexSkill}
                skill={skill}
                indexStudy={null}
                study={null}
              />
              <ShowSkillRnkSkillsTableComponent
                key={indexSkill + " Rnk"}
                indexSkill={indexSkill}
                skill={skill}
                indexStudy={null}
                study={null}
              />
              <SkillAbiSkillsTableComponent
                key={indexSkill + " Abi"}
                skill={skill}
              />
              <SkillBnsSkillsTableComponent
                key={indexSkill + " Bns"}
                skill={skill}
              />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
