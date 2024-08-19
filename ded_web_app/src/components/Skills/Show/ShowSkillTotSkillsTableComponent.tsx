import { ShowOneSkillProps } from "../interface/SkillsInterface";

export const ShowSkillTotSkillsTableComponent: React.FC<ShowOneSkillProps> = ({
  skill,
  abilitys,
  size
}) => {
  return (
    <div
      className="rpgui-container-framed-grey-mini"
      style={{ color: "orange" }}
    >
      {skill.skillRank + abilitys + skill.skillBonus + size}
    </div>
  );
};
