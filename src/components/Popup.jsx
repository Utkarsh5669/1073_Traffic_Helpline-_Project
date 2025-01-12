import React from "react";
import "../styles/Popup.css"; // Optional: Create a CSS file for styling the popup

const Popup = ({ content, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times; {/* This represents the close (cross) button */}
        </button>
        {content}
      </div>
    </div>
  );
};

export default Popup;
