import React, { useState } from "react";
import { FormattingText } from "../Formatting/Function";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { signAndCountToString } from "../functions";
import { TotAndBonusElement } from "../SummaryChar/component/TotAndBonus";

export interface PopupProps {
  text?: string | string[];
  popText?: ModifierEnum;
  bonusList?: TotAndBonusElement[];
  colorResult?: boolean
}

export const Popup: React.FC<PopupProps> = ({ text, popText, bonusList, colorResult }) => {
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
      // <div>
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
      // </div>
    );
  } else if (text) {
    return (
      // <div>
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
            <span style={{color: colorResult? "orange" : ""}}>{text.slice(1)}</span>
          </span>
        ) : (
          <span style={{color: colorResult? "orange" : ""}}>{text}</span>
        )}

        {popText && (
          <span
            className={`popuptext rpgui-container-framed ${
              showPopup ? "show" : ""
            }`}
          >
            {popText.text && <div><p>{FormattingText(popText.text)}</p></div>}
            {popText.description && (
              <div>{FormattingText(popText.description)}</div>
            )}
          </span>
        )}
      </span>
      // </div>
    );
  }
};
