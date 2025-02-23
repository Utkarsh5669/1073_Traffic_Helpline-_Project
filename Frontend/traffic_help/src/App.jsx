import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActiveIncidents from "./components/ActiveIncidents";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import Footer from "./components/Footer";
import CreateIncident from "./components/CreateIncident";
import Popup from "./components/Popup";
import Header from "./components/Header";
import Info from "./components/Info";
import Settings from "./components/Settings";
import FAQs from "./components/FAQ";
import Support from "./components/Support";
import MonitoringDashboard from "./components/MonitoringDashboard";
// import { IncidentProvider } from "./components/IncidentContext";
import "./styles/global.css";
import Responders from "./components/Responder";
import ViewAttendance from "./components/ViewAttendance";
import TMS from "./components/TMS";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Sidebar openPopup={openPopup} />
            <Routes>
              <Route path="/" element={<MapView />} />
              <Route path="/create-incident" element={<CreateIncident />} />
              <Route path="/active-incidents" element={<ActiveIncidents />} />
              <Route path="/responders" element={<Responders/>} />
              <Route path="/view-attendance" element={<ViewAttendance />} />
              <Route path="/tms" element={<TMS />} />
              <Route
                path="/monitoring-dashboard"
                element={
                  <div className="monitoring-dashboard-container">
                    <MonitoringDashboard />
                  </div>
                }
              />
              
            </Routes>
          </main>
          {isPopupOpen && <Popup content={popupContent} onClose={closePopup} />}
          <Routes>
          <Route path="/info" element={<Info />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/support" element={<Support />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    
  );
};

export default App;
