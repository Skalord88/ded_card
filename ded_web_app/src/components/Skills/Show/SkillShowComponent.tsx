import { CharProps } from "../../CharacterData";
import { SkillProps } from "../interface/SkillsInterface";
import { SkillShowSkillsTableComponent } from "./SkillShowSkillsTableComponent";

export const SkillShowComponent: React.FC<CharProps> = ({ char }) => {
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
                    abilitys={char.abilitys}
                    size={char.race.size.hide}
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
