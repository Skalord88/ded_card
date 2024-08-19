import { ShowOneSkillProps } from "../interface/SkillsInterface";

export const ShowStudyTotSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
  skill,
  study,
  abilitys
}) => {
  return (
    <>
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
      >
        {study && abilitys ? (
          <>
            {Math.floor(study.rank) +
              abilitys +
              skill.skillBonus}{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
