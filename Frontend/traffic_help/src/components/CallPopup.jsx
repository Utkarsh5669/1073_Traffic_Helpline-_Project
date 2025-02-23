import React from "react";

const CallPopup = ({ onClose }) => {
  return (
    <div>
      <h3>Call</h3>
      <button onClick={onClose}>Close</button>
      {/* Add your call UI here */}
    </div>
  );
};

export default CallPopup;
