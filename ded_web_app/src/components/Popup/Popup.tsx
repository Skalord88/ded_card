import React, { useState } from "react";
import "../../css/style.css";

export interface PopupProps {
  text: string;
  popText: string;
}

export const Popup: React.FC<PopupProps> = ({ text, popText }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (show: boolean) => {
    setShowPopup(show);
  };

  return (
    <div
      className="popup"
      onMouseEnter={() => togglePopup(true)}
      onClick={() => togglePopup(false)}
      onMouseLeave={() => togglePopup(false)}
    >
      <div className="rpgui-cursor-point">
        <p>{text}</p>
      </div>
      <div
        style={{ width: 400, overflowY: "scroll" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}
      >
        <p>{popText}</p>
      </div>
    </div>
  );
};
