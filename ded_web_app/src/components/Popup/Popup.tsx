import React, { useState } from "react";

export interface PopupProps {
  text: string | string[];
  popText: string;
}

export const Popup: React.FC<PopupProps> = ({ text, popText }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show: boolean) => {
    setShowPopup(show);
  };

  return (
    <p
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

      <span
        style={{ width: 400, overflowY: "scroll" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}
      >
        {popText}
      </span>
    </p>
  );
};
