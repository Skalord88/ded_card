import { useState } from "react";
import { ThrowDice20 } from "../../Dice/Functions";
import { Hit } from "../../Dice/Hit";
import { Damage } from "../../Dice/Damage";
import { FormattingText } from "../../Formatting/Function";
import { DicePopupProps } from "./Interface";

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
          style={{ width: 300, textAlign: "center" }}
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          {typeof textOrWeapon === "string" ? (
            <>
              <p>
                {dice} + {value} = {dice + value}
              </p>
              {modifiers.map((mod) => {
                return (
                  <p style={{ color: "yellow" }}>
                    {dice} + {value} + {mod.bonus} = {dice + value + mod.bonus}{" "}
                    {mod.targets[1]? " vs " + FormattingText(mod.targets[1]) : ""}
                  </p>
                );
              })}
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
