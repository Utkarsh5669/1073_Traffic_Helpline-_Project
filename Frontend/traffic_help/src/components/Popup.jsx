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

// import React from "react";

// const Popup = ({ content, onClose, popupType }) => {
//   const renderPopupContent = () => {
//     if (popupType === "Chat") {
//       return (
//         <div>
//           <h3 className="popup-header">Chat</h3>
//           <p className="popup-content">Start a chat with the traffic police control room.</p>
//         </div>
//       );
//     } else if (popupType === "call") {
//       return (
//         <div>
//           <h3 className="popup-header">Call</h3>
//           <p className="popup-content">You can call us at <strong>1073</strong> for emergencies.</p>
//         </div>
//       );
//     } else if (popupType === "notifications") {
//       return (
//         <div>
//           <h3 className="popup-header">Notifications</h3>
//           <ul className="popup-content">
//             <li>Incident #29 resolved successfully.</li>
//             <li>First responder confirmed on scene.</li>
//             <li>New incident reported in Sector 17.</li>
//           </ul>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="popup-container">
//       <button className="close-popup-btn" onClick={onClose}>
//         ✖
//       </button>
//       {renderPopupContent()}
//     </div>
//   );
// };

// export default Popup;
