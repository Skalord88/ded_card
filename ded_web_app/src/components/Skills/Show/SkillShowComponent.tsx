import { Abilitys } from "../../Abilitys/Interface";
import { CharacterPc } from "../../interfaces";
import { FindInMoreLengthModifier } from "../../Modifiers/Function";
import { Modifiers } from "../../Modifiers/ModifierInterface";
import { SkillProps } from "../interface/SkillsInterface";
import { SkillShowSkillsTableComponent } from "./SkillShowSkillsTableComponent";

export type SkillShowComponentProps = {
  char: CharacterPc;
  abilitys: Abilitys;
  modifications: Modifiers[];
};

export type ListModSkillsStudies = {
  listSkills: Modifiers[],
  listStudies: Modifiers[]
};

export const SkillShowComponent: React.FC<SkillShowComponentProps> = ({
  char,
  abilitys,
  modifications
}) => {
  const listModSkillsStudies: ListModSkillsStudies = {
    listSkills: FindInMoreLengthModifier(modifications, "SKILL")  || [],
    listStudies: FindInMoreLengthModifier(modifications, "STUDY")  || []
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8% 50% 12% 10% 10% 10%"
        }}
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
          <p>abi</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>bns</p>
        </div>
        {char.skillsList ? (
          <>
            {char.skillsList.map((skill: SkillProps, index: number) => {
              return (
                <>
                  <SkillShowSkillsTableComponent
                    key={index}
                    indexSkill={index}
                    skill={skill}
                    indexStudy={null}
                    study={null}
                    abilitys={abilitys}
                    modifiers={listModSkillsStudies}
                  />
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
