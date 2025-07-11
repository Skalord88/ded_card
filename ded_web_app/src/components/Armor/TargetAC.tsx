import { signAndCount } from "../functions";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { ArmorClass } from "./interface/ArmorInterface";

export type TargetACProps = {
  target: ArmorClass[];
  composed: Prerequisite[];
};

export const TargetAC: React.FC<TargetACProps> = ({ target, composed }) => {
  return (
      <div className="rpgui-container-framed-grey">
        {target.map((t, index) => (
          <ShowTargetAC armor={t} key={index} />
        ))}
        {composed.map((c, index) => (
          <ShowComposedAC armor={c} key={index} />
        ))}
      </div>
  );
};

export type ShowTargetACProps = {
  armor: ArmorClass;
};

export const ShowTargetAC: React.FC<ShowTargetACProps> = ({ armor }) => {
  return (
    <>
      <p>{armor.special}</p>
      {armor.deflectionBonuses > 0 && (
        <p>
          {armor.target.join(", ")} deflection: {signAndCount([armor.deflectionBonuses]).sign}{signAndCount([armor.deflectionBonuses]).number}
        </p>
      )}
      {armor.dodgeBonus > 0 && (
        <p>
          {armor.target.join(", ")} dodge: {signAndCount([armor.dodgeBonus]).sign}{signAndCount([armor.dodgeBonus]).number}
        </p>
      )}
      {armor.shieldBonus > 0 && (
        <p>
          {armor.target.join(", ")} shield: {signAndCount([armor.shieldBonus]).sign}{signAndCount([armor.shieldBonus]).number}
        </p>
      )}
    </>
  );
};

export type ShowComposedACProps = {
    armor: Prerequisite;
  };
  
  export const ShowComposedAC: React.FC<ShowComposedACProps> = ({ armor }) => {
    return (
      <></>
    )
}