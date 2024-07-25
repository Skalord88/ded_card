import { OneSkillProps, Study } from "../interfaces";
import { ClassSkillSkillsTableComponent } from "./ClassSkillSkillsTableComponent";
import { SkillAbiSkillsTableComponent } from "./SkillAbiSkillsTableComponent";
import { SkillBnsSkillsTableComponent } from "./SkillBnsSkillsTableComponent";
import { SkillRnkSkillsTableComponent } from "./SkillRnkSkillsTableComponent";
import { SkillTotSkillsTableComponent } from "./SkillTotSkillsTableComponent";
import { StudyAbiSkillsTableComponent } from "./Study/StudyAbiSkillsTableComponent";
import { StudyBnsSkillsTableComponent } from "./Study/StudyBnsSkillsTableComponent";
import { StudyRnkSkillsTableComponent } from "./Study/StudyRnkSkillsTableComponent";
import { StudyTotSkillsTableComponent } from "./Study/StudyTotSkillsTableComponent";

export const SkillSkillsTableComponent: React.FC<OneSkillProps> = ({
    indexSkill,
    skill,
    maxSkillsPoints,
    spentSkillPnts,
    maxToSpentPoints,
    updateRank
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
                        {study.study}
                      </div>
                      <StudyTotSkillsTableComponent
                        key={indexSkill + "." + index + " Tot"}
                        indexSkill={indexSkill}
                        skill={skill}
                        indexStudy={index}
                        study={study}
                        maxSkillsPoints={maxSkillsPoints}
                        spentSkillPnts={spentSkillPnts}
                        maxToSpentPoints={maxToSpentPoints}
                        updateRank={updateRank}
                      />
                      <StudyRnkSkillsTableComponent
                        key={indexSkill + "." + index + " Rnk"}
                        indexSkill={indexSkill}
                        skill={skill}
                        indexStudy={index}
                        study={study}
                        maxSkillsPoints={maxSkillsPoints}
                        spentSkillPnts={spentSkillPnts}
                        maxToSpentPoints={maxToSpentPoints}
                        updateRank={updateRank}
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
                  {skill.nameSkill}
                </div>
                <SkillTotSkillsTableComponent
                  key={indexSkill + " Tot"}
                  indexSkill={indexSkill}
                  skill={skill}
                  indexStudy={null}
                  study={null}
                  maxSkillsPoints={maxSkillsPoints}
                  maxToSpentPoints={maxToSpentPoints}
                  spentSkillPnts={spentSkillPnts}
                  updateRank={updateRank}
                />
                <SkillRnkSkillsTableComponent
                  key={indexSkill + " Rnk"}
                  indexSkill={indexSkill}
                  skill={skill}
                  indexStudy={null}
                  study={null}
                  maxSkillsPoints={maxSkillsPoints}
                  maxToSpentPoints={maxToSpentPoints}
                  spentSkillPnts={spentSkillPnts}
                  updateRank={updateRank}
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