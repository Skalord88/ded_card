import { AttackOptionsElement } from "../../pages/Fight";
import { WeaponElement } from "../ModifiedCharacter/interface/ModifiedCharacter";
import { TotAndBonusElement } from "../SummaryChar/component/TotAndBonus";
import { criticalDice, CriticalHit, DiceNumber, throwDice } from "./Functions";

export type ThrowDiceProps = {
  dice: {one: number, molti: number[]};
  value: WeaponElement;
  target: number;
  listValue: TotAndBonusElement[][]
};

export const ThrowDice: React.FC<ThrowDiceProps> = ({
  dice,
  value,
  target,
  listValue
}) => {
  return(
  <>
  {dice.molti.map(d => {
    
  if(!value.weapon) return null;
  const bab: number = listValue.reduce((tot, b) => tot + b.reduce((totB, bon) => totB + bon.bonus, 0) ,0 );
  const tot: number = d + bab;
  const damage: number = value.damageMelee || value.babRanged || 0
  if (![1].concat(CriticalHit(value.weapon.critical)).includes(d)) {
    
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
          {d} {tot > 0 ? " + " : " "} {tot} =
          <span style={{ color: "orange" }}>{" " + tot}</span>
        </p>
        <p>{result}</p>
        {dicesDamage && (
          <p>
            {dicesDamage.length === 1 ? (
              <span>
                {dicesDamage[0]}
                {damage > 0 ? " + " : ""} {damage}
                {" = "}
                {dicesDamage[0] + damage}
              </span>
            ) : (
              <span>
                {dicesDamage[0]} + {dicesDamage[1]}{" "}
                {damage > 0 ? " + " : ""}
                {damage}
                {" = "}
                {dicesDamage[0] + dicesDamage[1] + damage}
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
    const tot: number = critConfirmation + bab;
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
          ? dicesDamage[0] + damage
          : dicesDamage[0] + dicesDamage[1] + damage;
    return (
      <div className="rpgui-container-framed golden">
        <p style={{ color: "yellow" }}>
          {d}
          {" on dice, crit!"}
        </p>
        <p>
          {critConfirmation} {bab > 0 ? " + " : " "} {bab} =
          <span style={{ color: "orange" }}>{" " + tot}</span>
        </p>
        <p>{result}</p>
        <p>
          {dicesDamage.join(" + ")}
          {damage < 0 ? " - " : " + "}
          {damage}
          {" = "}
          {totDicesDamage + damage}
        </p>
      </div>
    );
  }})}</>
)
};
