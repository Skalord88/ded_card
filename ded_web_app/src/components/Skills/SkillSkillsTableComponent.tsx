import { ClassSkillSkillsTableComponent } from "./ClassSkillSkillsTableComponent";
import { IsHide } from "./functions/Functions";
import { OneSkillProps, Study } from "./interface/SkillsInterface";
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
  abilitys,
  size,
  updateRank
}) => {
  return (
    <>
      {abilitys ? (
        <>
          <>
            {skill !== null ? (
              <>
                {skill.fieldOfStudy.length > 0 ? (
                  <>
                    <ClassSkillSkillsTableComponent skill={skill} abilitys={0} size={0} />
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
                            abilitys={0}
                            size={0}
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
                            abilitys={0}
                            size={0}
                            updateRank={updateRank}
                          />
                          <StudyAbiSkillsTableComponent
                            key={indexSkill + "." + index + " Abi"}
                            study={study}
                            ability={skill.skillAbility}
                            skillAbility={0}
                            skillBonus={0}
                          />
                          <StudyBnsSkillsTableComponent
                            key={indexSkill + "." + index + " Bns"}
                            study={study}
                            ability={skill.skillAbility}
                            skillAbility={0}
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
                      abilitys={0}
                      size={0}
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
                      abilitys={abilitys}
                      size={ IsHide(skill.nameSkill)? size : 0 }
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
                      abilitys={0}
                      size={0}
                      updateRank={updateRank}
                    />
                    <SkillAbiSkillsTableComponent
                      key={indexSkill + " Abi"}
                      skill={skill}
                      abilitys={abilitys}
                      size={0}
                    />
                    <SkillBnsSkillsTableComponent
                      key={indexSkill + " Bns"}
                      skill={skill}
                      abilitys={0}
                      size={ IsHide(skill.nameSkill)? size : 0 }
                    />
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
