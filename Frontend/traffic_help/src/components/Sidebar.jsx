import React, { useState } from "react";
import "../styles/Sidebar.css";
import CreateIncident from "./CreateIncident";
import ActiveIncidents from "./ActiveIncidents";
import ViewAttendance from "./ViewAttendance";
import Responders from "./Responder";
import TMS from "./TMS";

function Sidebar({ openPopup }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      {/* Hamburger Menu */}
      {!isSidebarVisible && (
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarVisible ? "visible" : ""}`}>
        <button className="close-button" onClick={hideSidebar}>
          &times;
        </button>
        <ul className="sidebar-list">
          <li>
            <button
              className="sidebar-button"
              onClick={() => {
                openPopup(<CreateIncident />);
                hideSidebar();
              }}
            >
              Create Event
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => {
                openPopup(<ActiveIncidents />);
                hideSidebar();
              }}
            >
              Active Events
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => {
                openPopup(<Responders />);
                hideSidebar();
              }}
            >
              Responders
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => {
                openPopup(<ViewAttendance />);
                hideSidebar();
              }}
            >
              View Attendance
            </button>
          </li>
          <li>
            <button
              className="sidebar-button"
              onClick={() => {
                openPopup(<TMS />);
                hideSidebar();
              }}
            >
              TMS
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarVisible && (
        <div className="overlay" onClick={hideSidebar}></div>
      )}
    </>
  );
}

export default Sidebar;
