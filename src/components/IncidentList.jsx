import React from "react";
import '../styles/IncidentList.css';


const IncidentList = ({ incidents }) => {
  return (
    <div className="incident-list">
      <h2>Active Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id} className="incident-item">
            <div>
              <strong>Event #{incident.id}</strong>
              <p>Location: {incident.location}</p>
              <p>Category: {incident.category}</p>
              <p>Responder: {incident.responder}</p>
            </div>
            <button className="btn-primary">View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
