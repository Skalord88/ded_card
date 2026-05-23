import React, { useState } from "react";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { FormattingText } from "../Formatting/Function";
import { TotAndBonusElement } from "../ModifiedCharacter/SummaryChar";
import { signAndCountToString } from "../functions";

export interface PopupProps {
  text?: string | string[];
  popText?: ModifierEnum;
  bonusList?: TotAndBonusElement[];
}

export const Popup: React.FC<PopupProps> = ({ text, popText, bonusList }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show: boolean) => {
    setShowPopup(show);
  };

  if (bonusList) {
    const totBonus: string = signAndCountToString([
      Math.floor(bonusList.reduce((acc, item) => acc + item.bonus, 0))
    ]);
    const bonusTexts: string[] = bonusList.map((item) => {
      const sign = item.bonus >= 0 ? "+" : "";
      return `${sign}${item.bonus} ${item.pop.text}`;
    });
    return (
      <span
        className="popup"
        onMouseEnter={() => togglePopup(true)}
        onClick={() => togglePopup(false)}
        onMouseLeave={() => togglePopup(false)}
      >
        <span className="rpgui-cursor-point" style={{ color: "yellow" }}>
          {totBonus}
        </span>
        <span
          className={`popuptext rpgui-container-framed ${
            showPopup ? "show" : ""
          }`}
        >
          {bonusTexts.join(", ")}
        </span>
      </span>
    );
  } else if (text) {
    return (
      <span
        className="popup"
        onMouseEnter={() => togglePopup(true)}
        onClick={() => togglePopup(false)}
        onMouseLeave={() => togglePopup(false)}
      >
        {(text as string[]) ? (
          <span className="rpgui-cursor-point">
            {" "}
            <span style={{ color: "yellow" }}>{text[0]}</span>
            <span>{text.slice(1)}</span>
          </span>
        ) : (
          <span>{text}</span>
        )}

        {popText && (
          <span
            className={`popuptext rpgui-container-framed ${
              showPopup ? "show" : ""
            }`}
          >
            {popText.text && <div>{FormattingText(popText.text)}</div>}
            {popText.description && (
              <div>{FormattingText(popText.description)}</div>
            )}
          </span>
        )}
      </span>
    );
  }
};
