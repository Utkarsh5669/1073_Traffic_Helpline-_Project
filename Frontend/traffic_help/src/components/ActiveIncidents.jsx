
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ActiveIncidents.css";

const ActiveIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("High Priority");
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch incidents from the database
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events"); // Change to your API URL
        setIncidents(response.data);
      } catch (error) {
        setError("Failed to load incidents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p>{error}</p>;

  // Filter active and completed incidents
  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.priority === filter &&
      (!incident.completed || incident.completed === 0 || incident.completed === "0")
  );

  const completedIncidents = incidents.filter(
    (incident) => incident.completed && incident.completed !== 0 && incident.completed !== "0"
  );

  return (
    <div className="active-incidents-container">
      <header className="active-incidents-header">
        <h2>Events</h2>
        {!showCompleted ? (
          <button className="completed-incidents-btn" onClick={() => setShowCompleted(true)}>
            View Completed Incidents
          </button>
        ) : (
          <button className="completed-incidents-close-btn" onClick={() => setShowCompleted(false)}>
            Close
          </button>
        )}
      </header>

      {!showCompleted && (
        <>
          <div className="filter-buttons">
            {["High Priority", "Medium Priority", "Low Priority"].map((priority) => (
              <button
                key={priority}
                className={`filter-btn ${filter === priority ? "active" : ""}`}
                onClick={() => setFilter(priority)}
              >
                {priority}
              </button>
            ))}
          </div>

          <div className="incident-list">
            {filteredIncidents.length === 0 ? (
              <p>No active incidents for {filter}.</p>
            ) : (
              filteredIncidents.map((incident) => (
                <div key={incident.id} className="incident-card">
                  <div className="incident-header">
                    <div className="incident-id">{incident.id}</div>
                    <div className="incident-timer">
                      <i className="timer-icon">⏱️</i> {incident.timer}
                    </div>
                    <div className="incident-location">{incident.location}</div>
                  </div>
                  <div className="incident-details">
                    <p><strong>MDT Number:</strong> {incident.mdt_number}</p>
                    <p><strong>Description:</strong> {incident.incident_description}</p>
                    <p><strong>Caller Name:</strong> {incident.caller_name}</p>
                    <p><strong>Caller Number:</strong> {incident.caller_number}</p>
                  </div>
                  <div className="incident-categories">
                    <strong>Category:</strong>{" "}
                    {incident.categories?.map((category, index) => (
                      <span key={index} className="incident-category">
                        {category}
                      </span>
                    )) || "No categories"}
                  </div>
                  <div className="incident-types">
                    <strong>Type:</strong>{" "}
                    {incident.type?.map((type, index) => (
                      <span key={index} className="incident-type">
                        {type}
                      </span>
                    )) || "No types"}
                  </div>
                  <div className="incident-status">
                    <span className="assigned">Assigned: {incident.assigned}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showCompleted && (
        <div className="completed-incidents">
          <h3>Completed Incidents</h3>
          <div className="incident-list">
            {completedIncidents.length === 0 ? (
              <p>No completed incidents.</p>
            ) : (
              completedIncidents.map((incident) => (
                <div key={incident.id} className="incident-card">
                  <div className="incident-header">
                    <div className="incident-id">{incident.id}</div>
                    <div className="incident-location">{incident.location}</div>
                  </div>
                  <div className="incident-details">
                    <p><strong>MDT Number:</strong> {incident.mdt_number}</p>
                    <p><strong>Description:</strong> {incident.incident_description}</p>
                    <p><strong>Caller Name:</strong> {incident.caller_name}</p>
                    <p><strong>Caller Number:</strong> {incident.caller_number}</p>
                  </div>
                  <div className="incident-categories">
                    {incident.categories?.map((category, index) => (
                      <span key={index} className="incident-category">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="incident-status">
                    <span className="assigned">Assigned: {incident.assigned}</span>
                    <span className="completed">Completed: {incident.completed}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveIncidents;
