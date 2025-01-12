import React from "react";

const ChatPopup = ({ onClose }) => {
  return (
    <div>
      <h3>Chat</h3>
      <button onClick={onClose}>Close</button>
      {/* Add your chat UI here */}
    </div>
  );
};

export default ChatPopup;
