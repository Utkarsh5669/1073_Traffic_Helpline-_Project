import React from "react";

const ChatPopup = ({ popupType, content, onClose }) => {
  const renderPopupContent = () => {
  if (popupType === "Chat") {
    return (
      <div>
        <h3 className="popup-header">Chat</h3>
        <p className="popup-content">Start a chat with the traffic police control room.</p>
      </div>
    );
}
return (
  <div className="popup-header-container">
    <button className="close-popup-header-btn" onClick={onClose}>
      ✖
    </button>
    {renderPopupContent()}
  </div>
);
}
return null;
};

// const ChatPopup = ({ onClose }) => {
//   return (
//     <div>
//       <h3>Chat</h3>
//       <button onClick={onClose}>Close</button>
//       {/* Add your chat UI here */}
//     </div>
//   );
// };

export default ChatPopup;
