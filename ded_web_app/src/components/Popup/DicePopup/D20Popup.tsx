import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { DicePopupProps } from "./Interface";
import { ThrowDice } from "../../Dice/ThrowDice";

export const D20Popup: React.FC<DicePopupProps> = ({
  textOrWeapon,
  value,
  modifiers
}) => {
  // console.log(modifiers);
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

  const text: string = textOrWeapon + ":";

  const togglePopup = (show: boolean) => {
    if (show) {
      const lancio = ThrowDice20();
      setDice(lancio);
    }
    setShowPopup(show);
  };

  return (
    <div
      className="popup"
      onClick={() => togglePopup(true)}
      onMouseLeave={() => togglePopup(false)}
      style={{ color: "yellow" }}
    >
      {text}

      <span
        style={{ width: 300, textAlign: "center" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}
      >
        <ThrowDice dice={dice} value={value} />
        {/* attackRoll */}
        {modifiers.attackRoll != null ? (
          <>
            {modifiers.attackRoll.map((att, index) => (
              <D20PopupModifiers
                dice={dice}
                value={value}
                target={att.target}
                bonus={Number(att.bonus)}
                key={index}
              />
            ))}
          </>
        ) : null}

        {/* specialAttacks */}
        {modifiers.specialAttacks != null ? (
          <>
            {modifiers.specialAttacks.map((att, index) => (
              <D20PopupModifiers
                dice={dice}
                value={value}
                target={[att.title]}
                bonus={att.value}
                key={index}
              />
            ))}
          </>
        ) : null}

        {/* saving */}
        {modifiers.savingThrow != null ? (
          <>
            {modifiers.savingThrow.map((save) =>
              save.target.map((target, index) =>
                save.type === "IMMUNITY" ? (
                  `immune to ${target.toString()}`
                ) : (
                  <D20PopupModifiers
                    dice={dice}
                    value={value}
                    target={[target]}
                    bonus={Number(save.bonus)}
                    key={index}
                  />
                )
              )
            )}
          </>
        ) : null}
      </span>
    </div>
  );
};

export type AttackRollProps = {
  dice: number;
  value: number;
  target: string[] | null;
  bonus: number | null;
};

export const D20PopupModifiers: React.FC<AttackRollProps> = ({
  dice,
  value,
  target,
  bonus
}) => {
  return (
    <>
      <ThrowDice dice={dice} value={value + (bonus ? bonus : 0)} />{" "}
      {target != null ? target.join(", ") : null}
    </>
  );
};
