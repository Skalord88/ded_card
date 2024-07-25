import { Weapon } from "../interfaces";
import { CriticalHit } from "./Functions";

export type CriticProps = {
  weapon: Weapon;
  dice: number;
  value: number;
};

export const Hit: React.FC<CriticProps> = ({ weapon, dice, value }) => {
  return (
    <>
          {dice === CriticalHit(weapon.critical) ? (
            <>
              <span style={{ color: "red" }}>{dice}</span> + {value} {"= "}
              {dice + value} critic!!
            </>
          ) : (
            <>
              {dice} + {value} = {dice + value}
            </>
          )}
      </>
  );
};
