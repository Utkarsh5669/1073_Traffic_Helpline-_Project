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
      categories: ["Traffic Congestion", "Road Accident", "Emergency"],
      assigned: 1,
      completed: 1,
    },
    {
      id: "Event Id: 31",
      priority: "Medium Priority",
      location: "Sector 22, Chandigarh",
      timer: "01:05",
      categories: ["Traffic Congestion, Rescue"],
      assigned: 1,
      completed: 1,
    },
    {
      id: "Event Id: 32",
      priority: "Low Priority",
      location: "Sector 17, Chandigarh",
      timer: "02:45",
      categories: ["Others"],
      assigned: 1,
      completed: 0,
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
