import React, { useState, useEffect } from "react";
import "../styles/MonitoringDashboard.css"; // Import the CSS file

const MonitoringDashboard = () => {
    const [events, setEvents] = useState([]);

    // Fetch Events from Backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/events");
                const data = await response.json();
                console.log("Fetched events:", data); // Log the data to check
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container">
            <h2>📊 Event Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
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
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.address}</td>
                            <td>{event.incident_description}</td>
                            <td>{event.caller_name}</td>
                            <td>{event.caller_number}</td>
                            <td>{event.mdt_number || "N/A"}</td>
                            <td>{event.category}</td>
                            <td>{event.event_type}</td>
                            <td>{event.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonitoringDashboard;
