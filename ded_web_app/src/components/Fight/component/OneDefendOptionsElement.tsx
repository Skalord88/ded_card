import { FightOptions } from "../../../pages/Fight";

export type OneDefendOptionsElementProps = {
  option: string;
  index: number;
  def: FightOptions;
};

export const OneDefendOptionsElement: React.FC<OneDefendOptionsElementProps> = ({
  option,
  index,
  def
}) => {
  const optionShow: string =
    option === "Attack"
      ? index === 0
        ? "CA "
        : index === 1
          ? "touch "
          : "flat-footed "
      : "";
  return (
    <>
      <p>
        {optionShow.length > 0 && <span>{optionShow}</span>}
        <span>{Math.floor(def.number)}</span>
      </p>
      <p>{def.text}</p>
    </>
  );
};