import { useState } from "react";
import { ThrowDice12 } from "../../Dice/Functions";
import { DicePopupProps } from "./Interface";
import { FormattingText } from "../../Formatting/Function";

export const D12Popup: React.FC<DicePopupProps> = ({
  textOrWeapon,
  value,
  modifiers
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

  const togglePopup = (show: boolean) => {
    if (show) {
      const lancio = ThrowDice12();
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
        {textOrWeapon.toString()}
        <span
          style={{ width: 300, textAlign: "center" }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          <p>
            {dice} + {value} = {dice + value}
          </p>
          {modifiers.map((mod) => {
            return (
              <>
                <p style={{ color: "yellow" }}>
                  {dice} + {value} + {mod.bonus} = {dice + value + mod.bonus} vs{" "}
                  {FormattingText(mod.targets[1])}
                </p>
              </>
            );
          })}
        </span>
      </div>
    </>
  );
};
