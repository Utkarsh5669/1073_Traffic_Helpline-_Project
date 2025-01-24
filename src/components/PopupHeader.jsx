import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/PopupHeader.css";

const PopupHeader = ({ popupType, content, onClose, children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    const newMessage = { type: "user", text: userMessage };
    setChatMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const aiResponse = { type: "ai", text: `AI Response to: ${userMessage}` };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setUserMessage("");
  };

  return (
    <div className="popup-header-container">
      <button className="popup-close-btn" onClick={onClose}>
        ✖
      </button>
      <h3 className="popup-title">{popupType}</h3>
      <div className="popup-content">
        {popupType === "Notifications" && content ? (
          content.map((notification, index) => (
            <div
              key={index}
              className={`notification-item ${
                notification.type === "alert" ? "notification-alert" : "notification-update"
              }`}
            >
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))
        ) : popupType === "Call" && content ? (
          <ul className="helpline-list">
            {content.map((helpline, index) => (
              <li key={index} className="helpline-item">
                <strong>{helpline.name}: </strong>
                <a href={`tel:${helpline.number}`} className="helpline-number">
                  {helpline.number}
                </a>
              </li>
            ))}
          </ul>
        ) : popupType === "Chat" ? (
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.type === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="chat-send-btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <p>No content available.</p>
        )}
      </div>
      {children && <div className="popup-children">{children}</div>}
    </div>
  );
};

PopupHeader.propTypes = {
  popupType: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default PopupHeader;
