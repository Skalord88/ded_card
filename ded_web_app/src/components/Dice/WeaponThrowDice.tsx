import { Weapon } from "../interfaces";
import { CriticalHit } from "./Functions";

export type WeaponThrowDiceProps = {
  dices: number[];
  values: number[];
  weapon: Weapon;
};

export const WeaponThrowDice: React.FC<WeaponThrowDiceProps> = ({
  dices,
  values,
  weapon
}) => {
  let results: { dice: number; value: number }[] = [];

  for (let i = 0; i < dices.length; i++) {
    results.push({ dice: dices[i], value: values[i] });
  }

  return (
    <>
      {results.map((res, index) => {
        return res.dice === CriticalHit(weapon.critical) ? (
          <p style={{ color: "red" }} key={index}>
            {res.dice} + {res.value} = {res.dice + res.value}
          </p>
        ) : (
          <p key={index}>
            {res.dice} + {res.value} = {res.dice + res.value}
          </p>
        );
      })}
    </>
  );
};
