import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { Critic } from "../../Dice/Critic";

export interface DicePopupProps {
  text: string;
  value: number;
  critic: boolean;
}

export const D20Popup: React.FC<DicePopupProps> = ({ text, value, critic }) => {
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
          <Critic critic={critic} dice={dice} value={value}/>
        </span>
      </div>
    </>
  );
};
