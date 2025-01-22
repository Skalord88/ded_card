import { useState } from "react";
import { throwDamageDice } from "../../Dice/Functions";

export type DamageThrowProps = {
  diceNumber: number;
  diceDamage: string;
};

export const DamageThrow: React.FC<DamageThrowProps> = ({
  diceNumber,
  diceDamage
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [damage, setDamage] = useState(0);

  const togglePopup = (show: boolean) => {
    if (show) {
      let dmg = 0;
      for (let i = 0; i < diceNumber; i++) {
        dmg += throwDamageDice(diceDamage);
      }
      setDamage(dmg);
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
      {diceNumber}
      {diceDamage}
      <span
        style={{ textAlign: "center" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}
      >
        {damage}
      </span>
    </div>
  );
};
