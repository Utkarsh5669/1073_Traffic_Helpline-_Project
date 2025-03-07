import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ActiveIncidents.css";

const ActiveIncidents = () => {
  const [incidents, setIncidents] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("High Priority");
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch incidents
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        // const response = await axios.get("https://4aee-2409-4055-4e18-8796-84ca-1132-464a-28a.ngrok-free.app/api/events");
        console.log("✅ API Response:", response.data);

        // Ensure we extract only the 'events' array
        if (response.data && Array.isArray(response.data.events)) {
          setIncidents(response.data.events);
        } else {
          console.error("🚨 API response format error:", response.data);
          setIncidents([]);
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        setError("Failed to load incidents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // ✅ Function to Mark an Incident as Completed (Frontend Only)
  const markAsCompleted = (id) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id ? { ...incident, completed: true } : incident
      )
    );
  };

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p>{error}</p>;

  // Active Incidents (Not Completed)
  const activeIncidents = incidents.filter(
    (incident) => 
      incident.priority?.toLowerCase() === filter.toLowerCase() && 
      (!incident.completed || incident.completed === "0" || incident.completed === false)
  );

  // Completed Incidents
  const completedIncidents = incidents.filter(
    (incident) => incident.completed && incident.completed !== "0" && incident.completed !== false
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
            {["High Priority", "Medium Priority", "Low Priority"].map(priority => (
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
            {activeIncidents.length === 0 ? (
              <p>No active incidents for {filter}.</p>
            ) : (
              activeIncidents.map(incident => (
                <div key={incident.id} className="incident-card">
                  <div className="incident-header">
                    <div className="incident-id">Event #{incident.id}</div>
                    <div className="incident-location">
                      <i className="fa-solid fa-map-marker-alt"></i> {incident.address || "Unknown Location"}
                    </div>
                  </div>
                  <div className="incident-details">
                    <p><strong>MDT Number:</strong> {incident.mdt_number || "N/A"}</p>
                    <p><strong>Description:</strong> {incident.incident_description}</p>
                    <p><strong>Caller Name:</strong> {incident.caller_name}</p>
                    <p><strong>Caller Number:</strong> {incident.caller_number}</p>
                  </div>
                  <div className="incident-meta">
                    <span className="incident-category">Category: {incident.category}</span>
                    <span className="incident-type">Type: {incident.event_type}</span>
                    <span className="incident-priority">Priority: {incident.priority}</span>
                  </div>
                  {/* ✅ Mark as Completed Button */}
                  <button className="mark-completed-btn" onClick={() => markAsCompleted(incident.id)}>
                    Mark as Completed ✅
                  </button>
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
              completedIncidents.map(incident => (
                <div key={incident.id} className="incident-card completed">
                  <div className="incident-header">
                    <div className="incident-id">Event #{incident.id}</div>
                    <div className="incident-location">
                      <i className="fa-solid fa-map-marker-alt"></i> {incident.address || "Unknown Location"}
                    </div>
                  </div>
                  <div className="incident-details">
                    <p><strong>MDT Number:</strong> {incident.mdt_number || "N/A"}</p>
                    <p><strong>Description:</strong> {incident.incident_description}</p>
                    <p><strong>Caller Name:</strong> {incident.caller_name}</p>
                    <p><strong>Caller Number:</strong> {incident.caller_number}</p>
                  </div>
                  <div className="incident-meta">
                    <span className="incident-category">Category: {incident.category}</span>
                    <span className="incident-type">Type: {incident.event_type}</span>
                    <span className="incident-priority">Priority: {incident.priority}</span>
                    <span className="incident-status completed">Completed ✅</span>
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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/ActiveIncidents.css";

// const ActiveIncidents = () => {
//   const [incidents, setIncidents] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("High Priority");
//   const [showCompleted, setShowCompleted] = useState(false);

//   // Fetch incidents
//   useEffect(() => {
//     const fetchIncidents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/events");
//         console.log("✅ API Response:", response.data);

//         // Ensure we set only the 'events' array
//         if (response.data && Array.isArray(response.data.events)) {
//           setIncidents(response.data.events);
//         } else {
//           console.error("🚨 API response format error:", response.data);
//           setIncidents([]);
//         }
//       } catch (error) {
//         console.error("❌ API Error:", error);
//         setError("Failed to load incidents. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIncidents();
//   }, []);

//   // ✅ Function to Mark an Incident as Completed
//   const markAsCompleted = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/events/${id}`, { completed: true });

//       // Update state instantly
//       setIncidents((prevIncidents) =>
//         prevIncidents.map((incident) =>
//           incident.id === id ? { ...incident, completed: true } : incident
//         )
//       );
//     } catch (error) {
//       console.error("❌ Error updating incident:", error);
//       alert("Failed to mark as completed. Please try again.");
//     }
//   };

//   if (loading) return <p>Loading incidents...</p>;
//   if (error) return <p>{error}</p>;

//   // Active Incidents (Not Completed)
//   const activeIncidents = incidents.filter(
//     (incident) => 
//       incident.priority?.toLowerCase() === filter.toLowerCase() && 
//       (!incident.completed || incident.completed === "0" || incident.completed === false)
//   );

//   // Completed Incidents
//   const completedIncidents = incidents.filter(
//     (incident) => incident.completed && incident.completed !== "0" && incident.completed !== false
//   );

//   return (
//     <div className="active-incidents-container">
//       <header className="active-incidents-header">
//         <h2>Events</h2>
//         {!showCompleted ? (
//           <button className="completed-incidents-btn" onClick={() => setShowCompleted(true)}>
//             View Completed Incidents
//           </button>
//         ) : (
//           <button className="completed-incidents-close-btn" onClick={() => setShowCompleted(false)}>
//             Close
//           </button>
//         )}
//       </header>

//       {!showCompleted && (
//         <>
//           <div className="filter-buttons">
//             {["High Priority", "Medium Priority", "Low Priority"].map(priority => (
//               <button
//                 key={priority}
//                 className={`filter-btn ${filter === priority ? "active" : ""}`}
//                 onClick={() => setFilter(priority)}
//               >
//                 {priority}
//               </button>
//             ))}
//           </div>

//           <div className="incident-list">
//             {activeIncidents.length === 0 ? (
//               <p>No active incidents for {filter}.</p>
//             ) : (
//               activeIncidents.map(incident => (
//                 <div key={incident.id} className="incident-card">
//                   <div className="incident-header">
//                     <div className="incident-id">Event #{incident.id}</div>
//                     <div className="incident-location">
//                       <i className="fa-solid fa-map-marker-alt"></i> {incident.address || "Unknown Location"}
//                     </div>
//                   </div>
//                   <div className="incident-details">
//                     <p><strong>MDT Number:</strong> {incident.mdt_number || "N/A"}</p>
//                     <p><strong>Description:</strong> {incident.incident_description}</p>
//                     <p><strong>Caller Name:</strong> {incident.caller_name}</p>
//                     <p><strong>Caller Number:</strong> {incident.caller_number}</p>
//                   </div>
//                   <div className="incident-meta">
//                     <span className="incident-category">Category: {incident.category}</span>
//                     <span className="incident-type">Type: {incident.event_type}</span>
//                     <span className="incident-priority">Priority: {incident.priority}</span>
//                   </div>
//                   {/* ✅ Mark as Completed Button */}
//                   <button className="mark-completed-btn" onClick={() => markAsCompleted(incident.id)}>
//                     Mark as Completed ✅
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {showCompleted && (
//         <div className="completed-incidents">
//           <h3>Completed Incidents</h3>
//           <div className="incident-list">
//             {completedIncidents.length === 0 ? (
//               <p>No completed incidents.</p>
//             ) : (
//               completedIncidents.map(incident => (
//                 <div key={incident.id} className="incident-card completed">
//                   <div className="incident-header">
//                     <div className="incident-id">Event #{incident.id}</div>
//                     <div className="incident-location">
//                       <i className="fa-solid fa-map-marker-alt"></i> {incident.address || "Unknown Location"}
//                     </div>
//                   </div>
//                   <div className="incident-details">
//                     <p><strong>MDT Number:</strong> {incident.mdt_number || "N/A"}</p>
//                     <p><strong>Description:</strong> {incident.incident_description}</p>
//                     <p><strong>Caller Name:</strong> {incident.caller_name}</p>
//                     <p><strong>Caller Number:</strong> {incident.caller_number}</p>
//                   </div>
//                   <div className="incident-meta">
//                     <span className="incident-category">Category: {incident.category}</span>
//                     <span className="incident-type">Type: {incident.event_type}</span>
//                     <span className="incident-priority">Priority: {incident.priority}</span>
//                     <span className="incident-status completed">Completed ✅</span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActiveIncidents;
