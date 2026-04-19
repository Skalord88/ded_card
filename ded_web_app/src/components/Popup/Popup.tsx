import React, { useState } from "react";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";
import { FormattingText } from "../Formatting/Function";

export interface PopupProps {
  text: string | string[];
  popText: ModifierEnum;
}

export const Popup: React.FC<PopupProps> = ({ text, popText }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show: boolean) => {
    setShowPopup(show);
  };

  // console.log("pop", popText)

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
    {popText.text && (
      <div>{FormattingText(popText.text)}</div>
    )}
    {popText.description && (
      <div>{FormattingText(popText.description)}</div>
    )}
  </span>
)}
    </span>
  );
};
