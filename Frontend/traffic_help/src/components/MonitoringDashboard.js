


import React, { useState, useEffect } from "react";
import "../styles/MonitoringDashboard.css"; // Import CSS for styling

const MonitoringDashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Events from Backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/events");
                const data = await response.json();
                console.log("Fetched events:", data); // Debugging
    
                // Extract and set only the 'events' array to avoid errors
                if (data && Array.isArray(data.events)) {
                    setEvents(data.events);
                } else {
                    console.error("🚨 API response is not in expected format:", data);
                    setEvents([]); // Prevent .map() errors
                }
            } catch (error) {
                console.error("❌ Error fetching events:", error);
            }
        };
    
        fetchEvents();
    }, []);
    

    return (
        <div className="dashboard-container">
            <h2>📊 Event Monitoring Dashboard</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Description</th>
                                <th>Caller Name</th>
                                <th>Caller Number</th>
                                <th>MDT Number</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Priority</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.address}</td>
                                        <td>{event.latitude || "N/A"}</td>
                                        <td>{event.longitude || "N/A"}</td>
                                        <td>{event.incident_description}</td>
                                        <td>{event.caller_name}</td>
                                        <td>{event.caller_number}</td>
                                        <td>{event.mdt_number || "N/A"}</td>
                                        <td>{event.category}</td>
                                        <td>{event.event_type}</td>
                                        <td className={`priority ${event.priority.toLowerCase().replace(" ", "-")}`}>
                                            {event.priority}
                                        </td>                                       
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="no-data">No events found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default MonitoringDashboard;
