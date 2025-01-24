import React, { useState } from "react";
import ChatLogo from "../assets/chat-logo.png";
import CallLogo from "../assets/Calling_Logo.png";
import NotificationLogo from "../assets/notification_logo.png";
import VideCallLogo from "../assets/video_call_icon.png";
import PopupHeader from "./PopupHeader";
import LOGO from "../assets/ChandigarhTrafficLogo.png";
import { Link } from "react-router-dom"; 
// import ThemeToggle from "./components/ThemeToggle";
// import ".//styles/global.css"; // Import global styles

const notifications = [
  {
    type: "alert",
    title: "Alert #29",
    message: "Event 29 has been completed.",
    time: "2025/01/11 17:23",
  },
  {
    type: "update",
    title: "Update #29",
    message: "First Responder: Shrey Sinha confirmed on scene.",
    time: "2025/01/11 17:23",
  },
  {
    type: "update",
    title: "Update #28",
    message: "Event #28 created at Sector 17.",
    time: "2025/01/10 14:57",
  },
];

const helplineNumbers = [
  {
    name: "Traffic Helpline",
    number: "1073",
  },
  {
    name: "Emergency Services",
    number: "112",
  },
  {
    name: "Chandigarh Police Station",
    number: "0172-2760001",
  },
];

const trvDetails = [
  {
    id: "TRV-101",
    assignedPerson: "Rajesh Kumar",
    contact: "9876543210",
  },
  {
    id: "TRV-102",
    assignedPerson: "Anita Sharma",
    contact: "8765432109",
  },
  {
    id: "TRV-103",
    assignedPerson: "Vikram Singh",
    contact: "7654321098",
  },
];

const Header = () => {
  const [popup, setPopup] = useState({
    type: "",
    content: null,
    isOpen: false,
  });

  const [selectedTRV, setSelectedTRV] = useState(null);

  const openSpecificPopup = (type, content = null) => {
    setPopup({
      type,
      content,
      isOpen: true,
    });
    setSelectedTRV(null); // Reset selected TRV when a new popup opens
  };

  const closePopup = () => {
    setPopup({
      type: "",
      content: null,
      isOpen: false,
    });
    setSelectedTRV(null);
  };

  const handleTRVClick = (trvId) => {
    const trv = trvDetails.find((item) => item.id === trvId);
    setSelectedTRV(trv);
  };

  return (
    <header className="header-container">
     <Link to="/" className="header-logo-link"> <img src={LOGO} alt="Chandigarh Traffic Police Logo" className="header-logo" /></Link>
      {/* <h2>1073 Chandigarh Traffic Police Control Room</h2> */}
      <h1>1073 Chandigarh Traffic Police Control Room</h1>

      <div className="header-buttons">
        <button onClick={() => openSpecificPopup("Chat")} aria-label="Open Chat">
          <img src={ChatLogo} alt="Chat" />
        </button>
        <button
          onClick={() => openSpecificPopup("Call", helplineNumbers)}
          aria-label="Call Control Room"
        >
          <img src={CallLogo} alt="Call" />
        </button>
        <button
          onClick={() => openSpecificPopup("Video Call", )}
          aria-label="Video Call Control Room"
        >
          <img src={VideCallLogo} alt=" Video Call" />
        </button>
        <button
          onClick={() => openSpecificPopup("Notifications", notifications)}
          aria-label="View Notifications"
        >
          <img src={NotificationLogo} alt="Notifications" />
        </button>
      </div>
      {popup.isOpen && (
        <PopupHeader popupType={popup.type} content={popup.content} onClose={closePopup}>
          {popup.type === "Call" && (
            <div>
              <h3>Helpline Numbers</h3>
              <ul className="helpline-list">
                {popup.content.map((helpline, index) => (
                  <li key={index} className="helpline-item">
                    <strong>{helpline.name}: </strong>
                    <a href={`tel:${helpline.number}`} className="helpline-number">
                      {helpline.number}
                    </a>
                  </li>
                ))}
              </ul>
              <h3>TRV IDs</h3>
              <div className="trv-list">
                {trvDetails.map((trv) => (
                  <button
                    key={trv.id}
                    onClick={() => handleTRVClick(trv.id)}
                    className="trv-button"
                  >
                    {trv.id}
                  </button>
                ))}
              </div>
              {selectedTRV && (
                <div className="trv-details">
                  <h4>Assigned Person: {selectedTRV.assignedPerson}</h4>
                  <p>Contact: {selectedTRV.contact}</p>
                </div>
              )}
            </div>
          )}
        </PopupHeader>
      )}
      {/* <ThemeToggle /> */}
    </header>
  );
};

export default Header;
