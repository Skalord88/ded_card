import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { Hit } from "../../Dice/Hit";
import { Weapon } from "../../interfaces";
import { Damage } from "../../Dice/Damage";

export interface DicePopupProps {
  textOrWeapon: string | Weapon;
  value: number;
}

export const D20Popup: React.FC<DicePopupProps> = ({ textOrWeapon, value }) => {
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
        {typeof textOrWeapon === "string" ? (
          <>{textOrWeapon}</>
        ) : (
          <>{textOrWeapon.name}</>
        )}
        <span
          style={{ width: 200, textAlign: "center" }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          {typeof textOrWeapon === "string" ? (
            <>
              {dice} + {value} = {dice + value}
            </>
          ) : (
            <Hit weapon={textOrWeapon} dice={dice} value={value} />
          )}
          {typeof textOrWeapon === "string" ? (
            <></>
          ) : (
            <Damage dice={dice} weapon={textOrWeapon} />
          )}
        </span>
      </div>
    </>
  );
};
