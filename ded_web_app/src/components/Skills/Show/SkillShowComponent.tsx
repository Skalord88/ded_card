import { SkillProps } from "../../interfaces";
import { SkillShowProps } from "../interface/SkillsInterface";
import { SkillShowSkillsTableComponent } from "./SkillShowSkillsTableComponent";

export const SkillShowComponent: React.FC<SkillShowProps> = ({
    skills
  }) => {  
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
          {skills ? (
            <>
              {skills.map((skill: SkillProps, index: number) => {
                return (
                  <>
                    <SkillShowSkillsTableComponent
                            key={index}
                            indexSkill={index}
                            skill={skill}
                            indexStudy={null}
                            study={null}
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