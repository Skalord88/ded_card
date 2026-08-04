import { AttackOptionsElement } from "../../pages/Fight";
import { criticalDice, CriticalHit, DiceNumber, throwDice } from "./Functions";

export type ThrowDiceProps = {
  dice: {one: number, molti: number[]};
  value: AttackOptionsElement;
  target: number;
  // listValue: TotAndBonusElement[][]
};

export const ThrowDice: React.FC<ThrowDiceProps> = ({
  dice,
  value,
  target
}) => {
  return(
  <>
  {dice.molti.map(d => {
  // if(!damage) return null;
  if (![1].concat(CriticalHit(value.weapon.critical)).includes(d)) {
    const tot: number = d + value.bab;
    const result: string =
      tot >= target
        ? tot + " >= " + target + " hit!"
        : tot + " < " + target + " miss :(";
    const dicesDamage: number[] | null =
      tot >= target
        ? DiceNumber(
          value.weapon.damage
        ).map((d) => throwDice(d))
        : null;
    return (
      <div className="rpgui-container-framed golden">
        <p>
          {d} {value.bab > 0 ? " + " : " "} {value.bab} =
          <span style={{ color: "orange" }}>{" " + tot}</span>
        </p>
        <p>{result}</p>
        {dicesDamage && (
          <p>
            {dicesDamage.length === 1 ? (
              <span>
                {dicesDamage[0]}
                {value.damage > 0 ? " + " : ""} {value.damage}
                {" = "}
                {dicesDamage[0] + value.damage}
              </span>
            ) : (
              <span>
                {dicesDamage[0]} + {dicesDamage[1]}{" "}
                {value.damage > 0 ? " + " : ""}
                {value.damage}
                {" = "}
                {dicesDamage[0] + dicesDamage[1] + value.damage}
              </span>
            )}
          </p>
        )}
      </div>
    );
  }
  if (d === 1) {
    const result: string = d + " on dice, crit miss!!!";

    return (
      <div className="rpgui-container-framed golden">
        <p style={{ color: "red" }}>{result}</p>
      </div>
    );
  }
  if (CriticalHit(value.weapon.critical).includes(d)) {
    const critConfirmation: number = throwDice(20);
    const tot: number = critConfirmation + value.bab;
    const result: string =
      tot >= target
        ? tot + " >= " + target + " crit confirmed!"
        : tot + " < " + target + " hit! crit not confirmed";
    const dicesDamage: number[] =
      tot >= target ? criticalDice(value.weapon) : DiceNumber(value.weapon.damage);
    const totDicesDamage: number =
      tot >= target
        ? dicesDamage.reduce((tot, d) => tot + d, 0)
        : dicesDamage.length === 1
          ? dicesDamage[0] + value.damage
          : dicesDamage[0] + dicesDamage[1] + value.damage;
    return (
      <div className="rpgui-container-framed golden">
        <p style={{ color: "yellow" }}>
          {d}
          {" on dice, crit!"}
        </p>
        <p>
          {critConfirmation} {value.bab > 0 ? " + " : " "} {value.bab} =
          <span style={{ color: "orange" }}>{" " + tot}</span>
        </p>
        <p>{result}</p>
        <p>
          {dicesDamage.join(" + ")}
          {value.damage < 0 ? " - " : " + "}
          {value.damage}
          {" = "}
          {totDicesDamage + value.damage}
        </p>
      </div>
    );
  }})}</>
)
};
