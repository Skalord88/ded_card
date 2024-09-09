import { AbilityAbbreviation, BonusAbilities } from "../../Abilitys/Functions";
import {
  OneSkillModBonusNumber
} from "../../Modifiers/Skills/Function";
import { D20Popup } from "../../Popup/DicePopup/D20Popup";
import { ClassSkillSkillsTableComponent } from "../ClassSkillSkillsTableComponent";
import { ShowTableSkillProps, Study } from "../interface/SkillsInterface";
import { SkillAbiSkillsTableComponent } from "../SkillAbiSkillsTableComponent";
import { SkillBnsSkillsTableComponent } from "../SkillBnsSkillsTableComponent";
import { StudyAbiSkillsTableComponent } from "../Study/StudyAbiSkillsTableComponent";
import { StudyBnsSkillsTableComponent } from "../Study/StudyBnsSkillsTableComponent";
import { ShowSkillRnkSkillsTableComponent } from "./ShowSkillRnkSkillsTableComponent";
import { ShowSkillTotSkillsTableComponent } from "./ShowSkillTotSkillsTableComponent";
import { ShowStudyRnkSkillsTableComponent } from "./ShowStudyRnkSkillsTableComponent";
import { ShowStudyTotSkillsTableComponent } from "./ShowStudyTotSkillsTableComponent";

export const SkillShowSkillsTableComponent: React.FC<ShowTableSkillProps> = ({
  indexSkill,
  skill,
  abilitys,
  modifiers
}) => {
  const bonus = OneSkillModBonusNumber(modifiers, skill.nameSkill)
  return (
    <>
      {skill && abilitys ? (
        <>
          {skill.fieldOfStudy.length > 0 ? (
            <>
              <ClassSkillSkillsTableComponent skill={skill} abilitys={0} bonus={0} />
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
                      <D20Popup
                        textOrWeapon={study.study}
                        value={
                          Math.floor(study.rank) +
                          BonusAbilities(
                            abilitys,
                            AbilityAbbreviation(skill.skillAbility)
                          ) +
                          skill.skillBonus
                        }
                        modifiers={[]}
                      />
                    </div>
                    <ShowStudyTotSkillsTableComponent
                      key={indexSkill + "." + index + " Tot"}
                      indexSkill={indexSkill}
                      skill={skill}
                      indexStudy={index}
                      study={study}
                      abilitys={BonusAbilities(
                        abilitys,
                        AbilityAbbreviation(skill.skillAbility)
                      )}
                      bonus={0}
                      modifiers={[]}
                    />
                    <ShowStudyRnkSkillsTableComponent
                      key={indexSkill + "." + index + " Rnk"}
                      indexSkill={indexSkill}
                      indexStudy={index}
                      study={study}
                      skill={skill}
                      abilitys={0}
                      bonus={0}
                      modifiers={[]}
                    />
                    <StudyAbiSkillsTableComponent
                      key={indexSkill + "." + index + " Abi"}
                      study={study}
                      ability={skill.skillAbility}
                      skillAbility={BonusAbilities(
                        abilitys,
                        AbilityAbbreviation(skill.skillAbility)
                      )}
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
                bonus={0}
              />
              {abilitys ? (
                <>
                  <div className="rpgui-container-framed-grey-mini">
                    <D20Popup
                      textOrWeapon={skill.nameSkill}
                      value={
                        skill.skillRank +
                        BonusAbilities(
                          abilitys,
                          AbilityAbbreviation(skill.skillAbility)
                        )
                        + bonus
                      }
                      modifiers={[]}
                    />
                  </div>
                  <ShowSkillTotSkillsTableComponent
                    key={indexSkill + " Tot"}
                    indexSkill={indexSkill}
                    skill={skill}
                    indexStudy={null}
                    study={null}
                    abilitys={BonusAbilities(
                      abilitys,
                      AbilityAbbreviation(skill.skillAbility)
                    )}
                    bonus={bonus}
                    modifiers={[]}
                  />
                  <ShowSkillRnkSkillsTableComponent
                    key={indexSkill + " Rnk"}
                    indexSkill={indexSkill}
                    skill={skill}
                    indexStudy={null}
                    study={null}
                    abilitys={0}
                    bonus={bonus}
                    modifiers={[]}
                  />
                  <SkillAbiSkillsTableComponent
                    key={indexSkill + " Abi"}
                    skill={skill}
                    abilitys={BonusAbilities(
                      abilitys,
                      AbilityAbbreviation(skill.skillAbility)
                    )}
                    bonus={0}
                  />
                  <SkillBnsSkillsTableComponent
                    key={indexSkill + " Bns"}
                    skill={skill}
                    abilitys={0}
                    bonus={bonus}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
