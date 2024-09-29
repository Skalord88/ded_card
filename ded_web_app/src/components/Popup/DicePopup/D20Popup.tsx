import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { FormattingText } from "../../Formatting/Function";
import { DicePopupProps } from "./Interface";
import { ThrowDice } from "../../Dice/ThrowDice";

export const D20Popup: React.FC<DicePopupProps> = ({
  textOrWeapon,
  value,
  modifiers
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [dice, setDice] = useState(0);

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
      {textOrWeapon}
  
      <span
        style={{ width: 300, textAlign: "center" }}
        className={`popuptext rpgui-container-framed ${showPopup ? "show" : ""}`}
      >
        <ThrowDice dice={dice} value={value} />
        {modifiers.map((mod, index) => (
          <p key={index} style={{ color: "yellow" }}>
            {dice} + {value} + {mod.bonus} = {dice + value + mod.bonus}{" "}
            {mod.targets.length > 0? "vs " + FormattingText(mod.targets.toString()) : null}
          </p>
        ))}
      </span>
    </div>
  );
  
};
