import React, { useState } from "react";

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

    <p
      className="popup"
      onMouseEnter={() => togglePopup(true)}
      onClick={() => togglePopup(false)}
      onMouseLeave={() => togglePopup(false)}
    >
        <span 
      className="rpgui-cursor-point"
      >{text}</span>

        <span style={{ width: 400, overflowY: "scroll" }}
        className={`popuptext rpgui-container-framed ${
          showPopup ? "show" : ""
        }`}>{popText}</span>
    </p>

  );
};
