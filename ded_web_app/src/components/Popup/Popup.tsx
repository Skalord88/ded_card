import React, { useState } from 'react';
import '../../css/style.css'

export interface PopupProps {
    text: string
    popText: string
}

export const Popup: React.FC<PopupProps> = ({ 
    text,
    popText
}) => {
    const [showPopup, setShowPopup] = useState(false);
  
    const togglePopup = (show: boolean) => {
      setShowPopup(show);
    };
  
    return (
        <>
      <div className="popup" onMouseEnter={() => togglePopup(true)} onMouseLeave={() => togglePopup(false)}>
        <p>{text}</p>
        <span style={{width: 400}} className={`popuptext rpgui-container-framed ${showPopup ? 'show' : ''}`}>
          {popText}
        </span>
      </div>
      </>
    );
  };
