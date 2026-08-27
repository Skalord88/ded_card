import { Button } from "react-bootstrap";
import { Weapon } from "../interfaces";
import { TotAndBonusElement } from "../SummaryChar/component/TotAndBonus";
import { criticalDice, CriticalHit, DiceNumber, throwDice } from "./Functions";
import { useEffect, useState } from "react";
import { Popup } from "../Popup/Popup";
import { Dices } from "lucide-react";

export type ThrowDicePropsWeapon = {
  position: string,
  weapon: Weapon;
  listBab: TotAndBonusElement[][];
  listDamage: number;
  // counter?: number;
};
export type ThrowDiceProps = {
  // dice: { one: number; molti: number[] };
  weapons: [ThrowDicePropsWeapon | null, ThrowDicePropsWeapon | null];
  target: number;
};

export const ThrowDice: React.FC<ThrowDiceProps> = ({
  // dice,
  weapons,
  target
}) => {
  const [thrownDice, setThrownDice] = useState<number[]>();

  useEffect(() => {
    setThrownDice(undefined);
  }, [weapons, target]);

  const throwAction = () => {
    const arrayOfDice = weapons.flatMap((w) =>
      w ? w.listBab.map((l) => throwDice(20)) : []
    );
    setThrownDice(arrayOfDice);
  };

  if (weapons)
    return (
      <>
        <Button className="rpgui-button" onClick={() => throwAction()}>
          <p>throw</p>
        </Button>
        {thrownDice &&
          weapons.map((w, indexW) => {
            if(w)
            return w.listBab.map((babGroup, indexBab) => {
              const diceRoll = thrownDice[indexBab];
              const damage = w.listDamage;
              const bab = babGroup.reduce((totB, bon) => totB + bon.bonus, 0);

              const tot = diceRoll + bab;

              if (
                ![1].concat(CriticalHit(w.weapon.critical)).includes(diceRoll)
              ) {
                const result =
                  tot >= target
                    ? tot + " >= " + target + " hit!"
                    : tot + " < " + target + " miss :(";

                const dicesDamage =
                  tot >= target
                    ? DiceNumber(w.weapon.damage).map((d) => throwDice(d))
                    : null;

                const textResult =
                  diceRoll + (bab >= 0 ? " + " : " ") + bab + " = " + tot;

                const totDiceDamamge =
                  damage + (dicesDamage?.reduce((tot, d) => tot + d, 0) ?? 0);

                const textResultDamage =
                  dicesDamage && dicesDamage.length === 1
                    ? dicesDamage[0] +
                      " " +
                      (damage >= 0 ? " + " : "") +
                      damage +
                      " = " +
                      totDiceDamamge
                    : dicesDamage &&
                      dicesDamage.join(" + ") +
                        (damage >= 0 ? " + " : "") +
                        damage +
                        " = " +
                        totDiceDamamge;

                return (
                  <div
                    key={`${indexW}-${indexBab}`}
                    className="rpgui-container-framed golden"
                  >
                    <p>
                      <Dices />

                      <Popup text={"R " + tot} popText={{ text: textResult }} />
                    </p>
                    <p>{result}</p>

                    {dicesDamage && (
                      <p>
                        <Dices />
                        <Popup
                          text={"D " + totDiceDamamge}
                          popText={{ text: textResultDamage ?? "" }}
                        />
                      </p>
                    )}
                  </div>
                );
              }

              if (diceRoll === 1) {
                return (
                  <div
                    key={`${indexW}-${indexBab}`}
                    className="rpgui-container-framed golden"
                  >
                    <p style={{ color: "red" }}>
                      {diceRoll} on dice, crit miss!!!
                    </p>
                  </div>
                );
              }

              if (CriticalHit(w.weapon.critical).includes(diceRoll)) {
                const critConfirmation = throwDice(20);
                const critTot = critConfirmation + bab;

                const critConfirmationText =
                  critConfirmation +
                  (bab > 0 ? " + " : " ") +
                  bab +
                  " = " +
                  critTot;
                const result =
                  critTot >= target
                    ? critTot + " >= " + target + " crit confirmed!"
                    : critTot + " < " + target + " hit! crit not confirmed";

                const dicesDamage: number[] =
                  critTot >= target
                    ? criticalDice(w.weapon)
                    : DiceNumber(w.weapon.damage);

                const totDicesDamage: number =
                  critTot >= target
                    ? dicesDamage.reduce((tot, d) => tot + d, 0)
                    : dicesDamage.length === 1
                      ? dicesDamage[0] + damage
                      : dicesDamage[0] + dicesDamage[1] + damage;

                const textDiceDamage =
                  dicesDamage.join(" + ") +
                  (damage < 0 ? " - " : " + ") +
                  damage +
                  " = " +
                  totDicesDamage;

                return (
                  <div
                    key={`${indexW}-${indexBab}`}
                    className="rpgui-container-framed golden"
                  >
                    <p style={{ color: "yellow" }}>
                      <Dices /> {diceRoll}
                      {" on dice, crit!"}
                    </p>

                    <p>
                      <Dices />
                      <Popup
                        text={"R " + critTot}
                        popText={{
                          text: critConfirmationText
                        }}
                      />
                    </p>

                    <p>{result}</p>

                    <p>
                      <Dices />{" "}
                      <Popup
                        text={"D " + totDicesDamage}
                        popText={{ text: textDiceDamage }}
                      />
                    </p>
                  </div>
                );
              }

              return null;
            });
          })}
      </>
    );

  return null;
};
