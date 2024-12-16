import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { DicePopupProps } from "./Interface";
import { ThrowDice } from "../../Dice/ThrowDice";

export const D20Popup: React.FC<DicePopupProps> = ({
  textOrWeapon,
  value,
  modifiers
}) => {
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
      </span>
    </div>
  );
};
