import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import CreateIncident from "./CreateIncident";
import ActiveIncidents from "./ActiveIncidents";
import ViewAttendance from "./ViewAttendance";
import Responders from "./Responder";
import TMS from "./TMS";

function Sidebar({ openPopup }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <ul className="sidebar-list">
        <li>
          <button
            className="sidebar-button"
            onClick={() =>
              openPopup(<CreateIncident />)
            }
          >
            Create Event
          </button>
        </li>
        <li>
          <button
            className="sidebar-button"
            onClick={() =>
              openPopup(<ActiveIncidents />)
            }
          >
            Active Events
          </button>
        </li>
        <li>
          <button
            className="sidebar-button"
            onClick={() =>
                openPopup(<Responders />)
            }
          >
            Responders
          </button>
        </li>
        <li>
          <button
            className="sidebar-button"
            onClick={() =>
              openPopup( <ViewAttendance/>)
            }
          >
            View Attendance
          </button>
        </li>
        <li>
          <button
            className="sidebar-button"
            onClick={() =>
              openPopup( <TMS/>)
            }
          >
            TMS
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
