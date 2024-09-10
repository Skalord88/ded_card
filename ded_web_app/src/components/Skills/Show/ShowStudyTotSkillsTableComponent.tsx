import { ShowOneSkillProps } from "../interface/SkillsInterface";

export const ShowStudyTotSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
  study,
  abilitys,
  bonus
}) => {
  return (
    <>
      <div
        className="rpgui-container-framed-grey-mini"
        style={{ color: "orange" }}
      >
        {study ? (
          <>
            {Math.floor(
              study.rank +
              abilitys +
              bonus
              )}{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
