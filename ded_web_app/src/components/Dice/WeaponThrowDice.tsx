import { AttackRoll } from "../Attack/AttackRoll/interface";
import { Weapon } from "../interfaces";
import { CriticalHit } from "./Functions";

export type WeaponThrowDiceProps = {
  dices: number[];
  values: number[];
  weapon: Weapon;
  targetMod?: AttackRoll;
};

export const WeaponThrowDice: React.FC<WeaponThrowDiceProps> = ({
  dices,
  values,
  weapon,
  targetMod
}) => {
  let results: { dice: number; value: number }[] = [];

  for (let i = 0; i < dices.length; i++) {
    results.push({ dice: dices[i], value: Math.floor(values[i]) });
  }

  return (
    <>
      {results.map((res, index) => {
        const bonus = targetMod?.bonus ? Number(targetMod?.bonus) : 0;
        const target = targetMod?.target
          ? targetMod.target.join(", ") + ":"
          : null;
        return CriticalHit(weapon.critical).includes(res.dice) ? (
          <div key={index}>
            <p style={{ color: "red" }}>
              {target} {res.dice} + {res.value + bonus} ={" "}
              {res.dice + res.value + bonus}
            </p>
          </div>
        ) : (
          <div key={index}>
            <p>
              {target} {res.dice} + {res.value + bonus} ={" "}
              {res.dice + res.value + bonus}
            </p>
          </div>
        );
      })}
    </>
  );
};
