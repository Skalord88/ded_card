import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { FormattingText } from "../../Formatting/Function";
import { DicePopupWeaponProps } from "./Interface";
import { WeaponThrowDice } from "../../Dice/WeaponThrowDice";
import { WeaponDamageDice } from "../../Dice/WeaponDamageDice";

export const D20PopupWeapon: React.FC<DicePopupWeaponProps> = ({
  type,
  bab,
  increments,
  modifiers,
  weapon
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

  const dices: number[] = increments.map((inc) => ThrowDice20());
  let attacks: number[] = [];
  for (let i = 0; i < increments.length; i++) {
    for (let b = 0; b < bab.length; b++) {
      attacks.push(bab[b]);
    }
  }

  const togglePopup = (show: boolean) => {
    if (show) {
      const lancio = ThrowDice20();
      setDice(lancio);
    }
    setShowPopup(show);
  };

  return (
    <>
      <div
        className="popup"
        onClick={() => togglePopup(true)}
        onMouseLeave={() => togglePopup(false)}
        style={{ color: "yellow" }}
      >
        {type}
        <span
          style={{ width: 300, textAlign: "center" }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          <>
            <div style={{ display: "grid" }}>
              <div style={{ gridColumn: 1 }}>
                <WeaponThrowDice dices={dices} values={attacks} weapon={weapon} />
              </div>
              <div style={{ gridColumn: 2 }}>
                <WeaponDamageDice dices={dices} weapon={weapon} />
              </div>
            </div>
            {modifiers.map((mod) => {
              return (
                <p style={{ color: "yellow" }}>
                  {mod.targets[1]
                    ? " vs " + FormattingText(mod.targets[1])
                    : ""}
                </p>
              );
            })}
          </>
        </span>
      </div>
    </>
  );
};
