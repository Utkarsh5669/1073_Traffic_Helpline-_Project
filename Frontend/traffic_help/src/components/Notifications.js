import React, { useState } from "react";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import "../styles/Notifications.css"; // Import your custom styles for notifications

const Notifications = () => {
  const [selectedTRV, setSelectedTRV] = useState(null); // Tracks selected TRV for chat
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Tracks if notifications are open
  const [chatMessages, setChatMessages] = useState(""); // Chat input messages
  const [messages, setMessages] = useState({}); // Stores messages per TRV

  const trvNames = [
    "TRV# 0011",
    "TRV# 0012",
    "TRV# 0013",
    "TRV# 0014",
    "TRV# 0015",
    "TRV# 0016",
    "TRV# 0017",
    "TRV# 0018",
    "TRV# 0019",
    "TRV# 0020",
    "TRV# 0021",
    "TRV# 0022",
    "TRV# 0023",
    "TRV# 0024",
    "TRV# 0025",
    "TRV# 0026",
    "TRV# 0027",
    "TRV# 0028",
    "TRV# 0029",
  ];

  // Open the chat for a specific TRV
  const openChat = (trv) => {
    setSelectedTRV(trv);
    if (!messages[trv]) {
      setMessages((prev) => ({ ...prev, [trv]: [] }));
    }
  };

  // Close the chat box
  const closeChat = () => {
    setSelectedTRV(null);
    setChatMessages("");
  };

  // Handle sending a message
  const sendMessage = () => {
    if (chatMessages.trim()) {
      setMessages((prev) => ({
        ...prev,
        [selectedTRV]: [...(prev[selectedTRV] || []), chatMessages],
      }));
      setChatMessages("");
    }
  };

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      {/* Notification Button */}
      <button
        className="notification-icon"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        🔔 Notifications
      </button>

      {/* List of TRVs in Notification */}
      {isNotificationOpen && (
        <div className="notification-popup">
          <h2>TRV List</h2>
          <div className="trv-list">
            {trvNames.map((trv) => (
              <div
                key={trv}
                className="trv-name"
                onClick={() => openChat(trv)}
              >
                {trv}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Box for Selected TRV */}
      {selectedTRV && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>Chat with {selectedTRV}</h3>
            <button className="close-chat-btn" onClick={closeChat}>
              ✖
            </button>
          </div>
          <div className="chat-messages">
            {messages[selectedTRV]?.map((message, index) => (
              <div key={index} className="chat-message">
                {message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatMessages}
              onChange={(e) => setChatMessages(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
