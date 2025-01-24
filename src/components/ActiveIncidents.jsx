import React, { useState } from "react";
import "../styles/ActiveIncidents.css";

const ActiveIncidents = () => {
  const [filter, setFilter] = useState("High Priority");
  const [showCompleted, setShowCompleted] = useState(false); // State to toggle completed incidents view

  const incidents = [
    {
      id: "Event Id: 30",
      priority: "High Priority",
      location: "Academic Block 3A, Punjab 140413",
      timer: "00:18",
      categories: ["Traffic Congestion"],
      type: ["Rescue"],
      assigned: 1,
      completed: 1,
      mdtNumber: "MDT-1234",
      description: "Multiple vehicle collision with injuries",
      callerName: "John Doe",
      callerNumber: "1234567890",
    },
    {
      id: "Event Id: 31",
      priority: "Medium Priority",
      location: "Sector 22, Chandigarh",
      timer: "01:05",
      categories: ["Traffic Congestion"],
      type: ["Emergency"],
      assigned: 1,
      completed: 1,
      mdtNumber: "MDT-5678",
      description: "Road blockage due to fallen tree",
      callerName: "Jane Smith",
      callerNumber: "0987654321",
    },
    {
      id: "Event Id: 32",
      priority: "Low Priority",
      location: "Sector 17, Chandigarh",
      timer: "02:45",
      categories: ["Others"],
      type: ["Emergency"],
      assigned: 1,
      completed: 0,
      mdtNumber: "MDT-9012",
      description: "Broken traffic signal",
      callerName: "Alice Brown",
      callerNumber: "1122334455",
    },
  ];

  const filteredIncidents = incidents.filter(
    (incident) => incident.priority === filter
  );

  const completedIncidents = incidents.filter(
    (incident) => incident.completed > 0
  );

  return (
    <div className="active-incidents-container">
      <header className="active-incidents-header">
        <h2>Events</h2>
        {!showCompleted ? (
          <button
            className="completed-incidents-btn"
            onClick={() => setShowCompleted(true)}
          >
            View Completed Incidents
          </button>
        ) : (
          <button
            className="completed-incidents-close-btn"
            onClick={() => setShowCompleted(false)}
          >
            Close
          </button>
        )}
      </header>

      {!showCompleted && (
        <>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === "High Priority" ? "active" : ""}`}
              onClick={() => setFilter("High Priority")}
            >
              High Priority
            </button>
            <button
              className={`filter-btn ${filter === "Medium Priority" ? "active" : ""}`}
              onClick={() => setFilter("Medium Priority")}
            >
              Medium Priority
            </button>
            <button
              className={`filter-btn ${filter === "Low Priority" ? "active" : ""}`}
              onClick={() => setFilter("Low Priority")}
            >
              Low Priority
            </button>
          </div>

          <div className="incident-list">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="incident-card">
                <div className="incident-header">
                  <div className="incident-id">{incident.id}</div>
                  <div className="incident-timer">
                    <i className="timer-icon">⏱️</i>
                    {incident.timer}
                  </div>
                  <div className="incident-location">{incident.location}</div>
                </div>
                <div className="incident-details">
                  <p><strong>MDT Number:</strong> {incident.mdtNumber}</p>
                  <p><strong>Description:</strong> {incident.description}</p>
                  <p><strong>Caller Name:</strong> {incident.callerName}</p>
                  <p><strong>Caller Number:</strong> {incident.callerNumber}</p>
                </div>
                <div className="incident-categories"> <strong>Category:</strong>
                  {incident.categories.map((category, index) => (
                    <span key={index} className="incident-category">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="incident-types"> <strong>Type:</strong>
                  {incident.type.map((type, index) => (
                    <span key={index} className="incident-type">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="incident-status">
                  <span className="assigned">Assigned: {incident.assigned}</span>
                  {/* <span className="completed">
                    Completed: {incident.completed}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showCompleted && (
        <div className="completed-incidents">
          <h3>Completed Incidents</h3>
          <div className="incident-list">
            {completedIncidents.map((incident) => (
              <div key={incident.id} className="incident-card">
                <div className="incident-header">
                  <div className="incident-id">{incident.id}</div>
                  <div className="incident-location">{incident.location}</div>
                </div>
                <div className="incident-details">
                  <p><strong>MDT Number:</strong> {incident.mdtNumber}</p>
                  <p><strong>Description:</strong> {incident.description}</p>
                  <p><strong>Caller Name:</strong> {incident.callerName}</p>
                  <p><strong>Caller Number:</strong> {incident.callerNumber}</p>
                </div>
                <div className="incident-categories">
                  {incident.categories.map((category, index) => (
                    <span key={index} className="incident-category">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="incident-status">
                  <span className="assigned">Assigned: {incident.assigned}</span>
                  <span className="completed">
                    Completed: {incident.completed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveIncidents;
