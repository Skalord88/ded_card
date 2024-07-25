import { useState } from "react";
import { ThrowDice12 } from "../../Dice/Functions";

export interface DicePopupProps {
  text: string;
  value: number;
}

export const D12Popup: React.FC<DicePopupProps> = ({ text, value }) => {
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
        {text}
        <span
          style={{ width: 200 }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          {value} + {dice} = {value + dice}
        </span>
      </div>
    </>
  );
};