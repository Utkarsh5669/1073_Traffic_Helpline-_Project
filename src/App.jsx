import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActiveIncidents from "./components/ActiveIncidents"; // Import the ActiveIncidents component
import Responder from "./components/Responder";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import NotificationPanel from "./components/NotificationsPanel";
import Footer from "./components/Footer";
import CreateIncident from "./components/CreateIncident";
import Popup from "./components/Popup"; // Import the Popup component
import ChatPopup from "./components/ChatPopup"; // Import the Chat Popup component
import CallPopup from "./components/CallPopup"; // Import the Call Popup component
import NotificationsPopup from "./components/NotificationPopup"; // Import the Notification Popup component
import "./App.css";
import logo from "./assets/Chandigarh_Traffic_Logo.png";
import PoliceLogo from "./assets/Chandigarh_Police_Logo.png";
import ChatLogo from "./assets/chat-logo.png";
import CallLogo from "./assets/Calling_Logo.png";
import NotificationLogo from "./assets/notification_logo.png";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [popupContent, setPopupContent] = useState(null); // State to hold popup content
  const [activePopup, setActivePopup] = useState(null); // State to manage which popup is active
  const [openPopupType, setOpenPopupType] = useState(null); // Tracks which popup is open

  // const incidents = [
  //   {
  //     id: 29,
  //     location: "Sector 9D, Chandigarh",
  //     category: "Rescue",
  //     responder: "Shrey Sinha",
  //   },
  //   {
  //     id: 28,
  //     location: "Sector 17, Chandigarh",
  //     category: "Emergency",
  //     responder: "Utkarsh Arora",
  //   },
  // ];

  const responders = [
    { name: "Shrey Sinha", status: "Available", role: "Responder" },
    { name: "Utkarsh Arora", status: "On Duty", role: "Responder" },
  ];

  const notifications = [
    {
      type: "alert",
      title: "Alert #29",
      message: "Incident 29 has been completed.",
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
      message: "Incident #28 created at Sector 17.",
      time: "2025/01/10 14:57",
    },
  ];

  // Function to open the popup with content
  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const openSpecificPopup = (popupType) => {
    setActivePopup(popupType);
    setIsPopupOpen(true);
     
    
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header-container">
          <img src={logo} alt="Logo" className="header-logo" />
          {/* <img src={PoliceLogo} alt="Logo" className="header-logo" /> */}
          <h2>1073 Chandigarh Traffic Police Control Room</h2>
          <div className="header-buttons">
            <button onClick={() => openSpecificPopup("Chat")}>
              <img src={ChatLogo} alt="Chat" />
            </button>
            <button onClick={() => openSpecificPopup("call")}>
              <img src={CallLogo} alt="Call" />
            </button>
            <button onClick={() => openSpecificPopup("notifications")}>
              <img src={NotificationLogo} alt="Notifications" />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Sidebar openPopup={openPopup} /> {/* Pass openPopup to Sidebar */}
          <Routes>
            <Route path="/" element={<MapView />} />
            {/* <Route path="/chat-popup" element={<ChatPopup />} />
            <Route path="/call-popup" element={<CallPopup />} />
            <Route path="/notifications-popup" element={<NotificationsPopup />} /> */}
            <Route path="/create-incident" element={<CreateIncident />} />
            <Route path="/active-incidents" element={<ActiveIncidents />} />
            <Route
              path="/responders"
              element={
                <div className="incident-responder-container">
                  <h2>Responders</h2>
                  {responders.map((responder, index) => (
                    <Responder key={index} responder={responder} />
                  ))}
                </div>
              }
            />
            <Route
              path="/view-attendance"
              element={
                <div>
                  <h2>View Attendance</h2>
                  {/* Add your attendance view logic here */}
                </div>
              }
            />
          </Routes>
        </main>

        {/* Show Popup if it's open */}
        {isPopupOpen && <Popup content={popupContent} onClose={closePopup} />}

        {/* {isPopupOpen && (
          <div className="popup-container">
            <div className="popup-content">
              <button className="close-popup-btn" onClick={closePopup}>
                ✖
              </button>
              {activePopup === "chat" && <h3>Chat Popup Content</h3>}
              {activePopup === "call" && <h3>Call Popup Content</h3>}
              {activePopup === "notifications" && (
                <div>
                  <h3>Notifications</h3>
                  <ul className="notification-list">
                    {notifications.map((notification) => (
                      <li key={notification.id} className="notification-item">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )} */}


        <Footer />
      </div>
    </Router>
  );
};

export default App;








// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ActiveIncidents from "./components/ActiveIncidents";
// import Responder from "./components/Responder";
// import Sidebar from "./components/Sidebar";
// import MapView from "./components/MapView";
// import Footer from "./components/Footer";
// import CreateIncident from "./components/CreateIncident";
// import Popup from "./components/Popup";
// import ChatPopup from "./components/ChatPopup";
// import CallPopup from "./components/CallPopup";
// import "./App.css";
// import logo from "./assets/Chandigarh_Traffic_Logo.png";
// import PoliceLogo from "./assets/Chandigarh_Police_Logo.png";
// import ChatLogo from "./assets/chat-logo.png";
// import CallLogo from "./assets/Calling_Logo.png";
// import NotificationLogo from "./assets/notification_logo.png";

// const App = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [popupContent, setPopupContent] = useState(null);
//   const [activePopup, setActivePopup] = useState(null);

//   // Example notifications array
//   const notifications = [
//     {
//       id: 1,
//       title: "New Incident Alert",
//       message: "Incident reported at Sector 21B.",
//       time: "2025-01-12 10:30 AM",
//     },
//     {
//       id: 2,
//       title: "Responder Update",
//       message: "Utkarsh Arora has confirmed his availability.",
//       time: "2025-01-12 09:15 AM",
//     },
//     {
//       id: 3,
//       title: "Incident Resolved",
//       message: "Incident #29 resolved successfully.",
//       time: "2025-01-11 05:00 PM",
//     },
//   ];

//   const responders = [
//     { name: "Shrey Sinha", status: "Available", role: "Responder" },
//     { name: "Utkarsh Arora", status: "On Duty", role: "Responder" },
//   ];

//   const openSpecificPopup = (popupType) => {
//     setActivePopup(popupType);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setPopupContent(null);
//     setActivePopup(null);
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         <header className="header-container">
//           <img src={logo} alt="Logo" className="header-logo" />
//           <h2>1073 Chandigarh Traffic Police Control Room</h2>
//           <div className="header-buttons">
//             <button onClick={() => openSpecificPopup("chat")}>
//               <img src={ChatLogo} alt="Chat" />
//             </button>
//             <button onClick={() => openSpecificPopup("call")}>
//               <img src={CallLogo} alt="Call" />
//             </button>
//             <button onClick={() => openSpecificPopup("notifications")}>
//               <img src={NotificationLogo} alt="Notifications" />
//             </button>
//           </div>
//         </header>

//         <main className="main-content">
//           <Sidebar openPopup={setPopupContent} />
//           <Routes>
//             <Route path="/" element={<MapView />} />
//             <Route path="/chat-popup" element={<ChatPopup />} />
//             <Route path="/call-popup" element={<CallPopup />} />
//             <Route path="/create-incident" element={<CreateIncident />} />
//             <Route path="/active-incidents" element={<ActiveIncidents />} />
//             <Route
//               path="/responders"
//               element={
//                 <div className="incident-responder-container">
//                   <h2>Responders</h2>
//                   {responders.map((responder, index) => (
//                     <Responder key={index} responder={responder} />
//                   ))}
//                 </div>
//               }
//             />
//           </Routes>
//         </main>

//         {/* Conditional Popup Rendering */}
//         {isPopupOpen && (
//           <div className="popup-container">
//             <div className="popup-content">
//               <button className="close-popup-btn" onClick={closePopup}>
//                 ✖
//               </button>
//               {activePopup === "chat" && <h3>Chat Popup Content</h3>}
//               {activePopup === "call" && <h3>Call Popup Content</h3>}
//               {activePopup === "notifications" && (
//                 <div>
//                   <h3>Notifications</h3>
//                   <ul className="notification-list">
//                     {notifications.map((notification) => (
//                       <li key={notification.id} className="notification-item">
//                         <h4>{notification.title}</h4>
//                         <p>{notification.message}</p>
//                         <span className="notification-time">
//                           {notification.time}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
