import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import '../styles/TMS.css'; // Import your custom styles

const TMS = () => {
  const [selectedTRV, setSelectedTRV] = useState(null);
  const [date, setDate] = useState(new Date());

  const trvNames = [
    "TRV# 0011",
    "TRV# 0012",
    "TRV# 0013",
    "TRV# 0014",
    "TRV# 0015",
    "TRV# 0016",
    "TRV# 0017",
    "TRV# 0018",
    "TRV# 0019",
    "TRV# 0020",
    "TRV# 0021",
    "TRV# 0022",
    "TRV# 0023",
    "TRV# 0024",
    "TRV# 0025",
    "TRV# 0026",
    "TRV# 0027",
    "TRV# 0028",
    "TRV# 0029",
  ];

  const timelineDetails = {
    "TRV# 0011": {
      dutyHistory: {
        shiftStartTime: "07:00 AM",
        shiftEndTime: "09:00 AM",
        dutyArea: "Sector 8, Sector 9",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 8 to Sector 9.",
        checkpoints: [
          { location: "Sector 8", timestamp: "07:05 AM" },
          { location: "Sector 9", timestamp: "08:15 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:00 AM", location: "Sector 9, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:05 AM", location: "Sector 8", duration: null },
        { eventType: "Incident Report", timestamp: "08:15 AM", location: "Sector 8", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "09:00 AM", location: "Sector 9", duration: null },
      ],
    },
    "TRV# 0012": {
      dutyHistory: {
        shiftStartTime: "08:30 AM",
        shiftEndTime: "10:30 AM",
        dutyArea: "Sector 16, Sector 17",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 16 to Sector 17.",
        checkpoints: [
          { location: "Sector 16", timestamp: "08:35 AM" },
          { location: "Sector 17", timestamp: "09:45 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:30 AM", location: "Sector 17, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:35 AM", location: "Sector 16", duration: null },
        { eventType: "Incident Report", timestamp: "09:45 AM", location: "Sector 16", duration: "5 minutes" },
        { eventType: "Duty End", timestamp: "10:30 AM", location: "Sector 17", duration: null },
      ],
    },
    "TRV# 0013": {
      dutyHistory: {
        shiftStartTime: "09:00 AM",
        shiftEndTime: "11:00 AM",
        dutyArea: "Sector 21, Sector 22",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 21 to Sector 22.",
        checkpoints: [
          { location: "Sector 21", timestamp: "09:10 AM" },
          { location: "Sector 22", timestamp: "10:40 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "09:00 AM", location: "Sector 22, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "09:10 AM", location: "Sector 21", duration: null },
        { eventType: "Incident Report", timestamp: "10:40 AM", location: "Sector 21", duration: "4 minutes" },
        { eventType: "Duty End", timestamp: "11:00 AM", location: "Sector 22", duration: null },
      ],
    },
    "TRV# 0014": {
      dutyHistory: {
        shiftStartTime: "07:15 AM",
        shiftEndTime: "09:15 AM",
        dutyArea: "Sector 14, Sector 15",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 14 to Sector 15.",
        checkpoints: [
          { location: "Sector 14", timestamp: "07:20 AM" },
          { location: "Sector 15", timestamp: "08:50 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:15 AM", location: "Sector 15, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:20 AM", location: "Sector 14", duration: null },
        { eventType: "Incident Report", timestamp: "08:50 AM", location: "Sector 14", duration: "2 minutes" },
        { eventType: "Duty End", timestamp: "09:15 AM", location: "Sector 15", duration: null },
      ],
    },
    "TRV# 0015": {
      dutyHistory: {
        shiftStartTime: "08:00 AM",
        shiftEndTime: "10:00 AM",
        dutyArea: "Sector 34, Sector 35",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 34 to Sector 35.",
        checkpoints: [
          { location: "Sector 34", timestamp: "08:05 AM" },
          { location: "Sector 35", timestamp: "09:30 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:00 AM", location: "Sector 35, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:05 AM", location: "Sector 34", duration: null },
        { eventType: "Incident Report", timestamp: "09:30 AM", location: "Sector 34", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "10:00 AM", location: "Sector 35", duration: null },
      ],
    },
    "TRV# 0016": {
      dutyHistory: {
        shiftStartTime: "06:45 AM",
        shiftEndTime: "08:45 AM",
        dutyArea: "Sector 30, Sector 31",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 30 to Sector 31.",
        checkpoints: [
          { location: "Sector 30", timestamp: "06:50 AM" },
          { location: "Sector 31", timestamp: "08:00 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "06:45 AM", location: "Sector 31, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "06:50 AM", location: "Sector 30", duration: null },
        { eventType: "Incident Report", timestamp: "08:00 AM", location: "Sector 30", duration: "2 minutes" },
        { eventType: "Duty End", timestamp: "08:45 AM", location: "Sector 31", duration: null },
      ],
    },
    "TRV# 0017": {
      dutyHistory: {
        shiftStartTime: "07:30 AM",
        shiftEndTime: "09:30 AM",
        dutyArea: "Sector 40, Sector 41",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 40 to Sector 41.",
        checkpoints: [
          { location: "Sector 40", timestamp: "07:35 AM" },
          { location: "Sector 41", timestamp: "08:50 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:30 AM", location: "Sector 41, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:35 AM", location: "Sector 40", duration: null },
        { eventType: "Incident Report", timestamp: "08:50 AM", location: "Sector 40", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "09:30 AM", location: "Sector 41", duration: null },
      ],
    },
    "TRV# 0018": {
      dutyHistory: {
        shiftStartTime: "08:15 AM",
        shiftEndTime: "10:15 AM",
        dutyArea: "Sector 1, Sector 2",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 1 to Sector 2.",
        checkpoints: [
          { location: "Sector 1", timestamp: "08:20 AM" },
          { location: "Sector 2", timestamp: "09:30 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:15 AM", location: "Sector 2, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:20 AM", location: "Sector 1", duration: null },
        { eventType: "Incident Report", timestamp: "09:30 AM", location: "Sector 1", duration: "4 minutes" },
        { eventType: "Duty End", timestamp: "10:15 AM", location: "Sector 2", duration: null },
      ],
    },
    "TRV# 0019": {
      dutyHistory: {
        shiftStartTime: "09:45 AM",
        shiftEndTime: "11:45 AM",
        dutyArea: "Sector 3, Sector 4",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 3 to Sector 4.",
        checkpoints: [
          { location: "Sector 3", timestamp: "09:50 AM" },
          { location: "Sector 4", timestamp: "10:55 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "09:45 AM", location: "Sector 4, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "09:50 AM", location: "Sector 3", duration: null },
        { eventType: "Incident Report", timestamp: "10:55 AM", location: "Sector 3", duration: "2 minutes" },
        { eventType: "Duty End", timestamp: "11:45 AM", location: "Sector 4", duration: null },
      ],
    },
    "TRV# 0020": {
      dutyHistory: {
        shiftStartTime: "07:30 AM",
        shiftEndTime: "09:30 AM",
        dutyArea: "Sector 8, Sector 9",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 8 to Sector 9.",
        checkpoints: [
          { location: "Sector 8", timestamp: "07:35 AM" },
          { location: "Sector 9", timestamp: "08:40 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:30 AM", location: "Sector 9, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:35 AM", location: "Sector 8", duration: null },
        { eventType: "Incident Report", timestamp: "08:40 AM", location: "Sector 8", duration: "5 minutes" },
        { eventType: "Duty End", timestamp: "09:30 AM", location: "Sector 9", duration: null },
      ],
    },
    "TRV# 0021": {
      dutyHistory: {
        shiftStartTime: "08:00 AM",
        shiftEndTime: "10:00 AM",
        dutyArea: "Sector 16, Sector 17",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 16 to Sector 17.",
        checkpoints: [
          { location: "Sector 16", timestamp: "08:05 AM" },
          { location: "Sector 17", timestamp: "09:10 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:00 AM", location: "Sector 17, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:05 AM", location: "Sector 16", duration: null },
        { eventType: "Incident Report", timestamp: "09:10 AM", location: "Sector 16", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "10:00 AM", location: "Sector 17", duration: null },
      ],
    },
    "TRV# 0022": {
      dutyHistory: {
        shiftStartTime: "09:15 AM",
        shiftEndTime: "11:15 AM",
        dutyArea: "Sector 21, Sector 22",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 21 to Sector 22.",
        checkpoints: [
          { location: "Sector 21", timestamp: "09:20 AM" },
          { location: "Sector 22", timestamp: "10:30 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "09:15 AM", location: "Sector 22, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "09:20 AM", location: "Sector 21", duration: null },
        { eventType: "Incident Report", timestamp: "10:30 AM", location: "Sector 21", duration: "4 minutes" },
        { eventType: "Duty End", timestamp: "11:15 AM", location: "Sector 22", duration: null },
      ],
    },
    "TRV# 0023": {
      dutyHistory: {
        shiftStartTime: "07:45 AM",
        shiftEndTime: "09:45 AM",
        dutyArea: "Sector 34, Sector 35",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 34 to Sector 35.",
        checkpoints: [
          { location: "Sector 34", timestamp: "07:50 AM" },
          { location: "Sector 35", timestamp: "08:55 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:45 AM", location: "Sector 35, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:50 AM", location: "Sector 34", duration: null },
        { eventType: "Incident Report", timestamp: "08:55 AM", location: "Sector 34", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "09:45 AM", location: "Sector 35", duration: null },
      ],
    },
    "TRV# 0024": {
      dutyHistory: {
        shiftStartTime: "08:30 AM",
        shiftEndTime: "10:30 AM",
        dutyArea: "Sector 30, Sector 31",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 30 to Sector 31.",
        checkpoints: [
          { location: "Sector 30", timestamp: "08:35 AM" },
          { location: "Sector 31", timestamp: "09:45 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:30 AM", location: "Sector 31, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:35 AM", location: "Sector 30", duration: null },
        { eventType: "Incident Report", timestamp: "09:45 AM", location: "Sector 30", duration: "5 minutes" },
        { eventType: "Duty End", timestamp: "10:30 AM", location: "Sector 31", duration: null },
      ],
    },
    "TRV# 0025": {
      dutyHistory: {
        shiftStartTime: "09:00 AM",
        shiftEndTime: "11:00 AM",
        dutyArea: "Sector 40, Sector 41",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 40 to Sector 41.",
        checkpoints: [
          { location: "Sector 40", timestamp: "09:10 AM" },
          { location: "Sector 41", timestamp: "10:20 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "09:00 AM", location: "Sector 41, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "09:10 AM", location: "Sector 40", duration: null },
        { eventType: "Incident Report", timestamp: "10:20 AM", location: "Sector 40", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "11:00 AM", location: "Sector 41", duration: null },
      ],
    },
    "TRV# 0026": {
      dutyHistory: {
        shiftStartTime: "07:15 AM",
        shiftEndTime: "09:15 AM",
        dutyArea: "Sector 14, Sector 15",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 14 to Sector 15.",
        checkpoints: [
          { location: "Sector 14", timestamp: "07:20 AM" },
          { location: "Sector 15", timestamp: "08:30 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:15 AM", location: "Sector 15, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:20 AM", location: "Sector 14", duration: null },
        { eventType: "Incident Report", timestamp: "08:30 AM", location: "Sector 14", duration: "2 minutes" },
        { eventType: "Duty End", timestamp: "09:15 AM", location: "Sector 15", duration: null },
      ],
    },
    "TRV# 0027": {
      dutyHistory: {
        shiftStartTime: "08:45 AM",
        shiftEndTime: "10:45 AM",
        dutyArea: "Sector 24, Sector 25",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 24 to Sector 25.",
        checkpoints: [
          { location: "Sector 24", timestamp: "08:50 AM" },
          { location: "Sector 25", timestamp: "09:55 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "08:45 AM", location: "Sector 25, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "08:50 AM", location: "Sector 24", duration: null },
        { eventType: "Incident Report", timestamp: "09:55 AM", location: "Sector 24", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "10:45 AM", location: "Sector 25", duration: null },
      ],
    },
    "TRV# 0028": {
      dutyHistory: {
        shiftStartTime: "07:00 AM",
        shiftEndTime: "09:00 AM",
        dutyArea: "Sector 5, Sector 6",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 5 to Sector 6.",
        checkpoints: [
          { location: "Sector 5", timestamp: "07:05 AM" },
          { location: "Sector 6", timestamp: "08:15 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "07:00 AM", location: "Sector 6, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "07:05 AM", location: "Sector 5", duration: null },
        { eventType: "Incident Report", timestamp: "08:15 AM", location: "Sector 5", duration: "4 minutes" },
        { eventType: "Duty End", timestamp: "09:00 AM", location: "Sector 6", duration: null },
      ],
    },
    "TRV# 0029": {
      dutyHistory: {
        shiftStartTime: "09:30 AM",
        shiftEndTime: "11:30 AM",
        dutyArea: "Sector 32, Sector 33",
      },
      movementTracking: {
        routeTaken: "Route visualization from Sector 32 to Sector 33.",
        checkpoints: [
          { location: "Sector 32", timestamp: "09:35 AM" },
          { location: "Sector 33", timestamp: "10:40 AM" },
        ],
      },
      events: [
        { eventType: "Login", timestamp: "09:30 AM", location: "Sector 33, Chandigarh", duration: null },
        { eventType: "Duty Start", timestamp: "09:35 AM", location: "Sector 32", duration: null },
        { eventType: "Incident Report", timestamp: "10:40 AM", location: "Sector 32", duration: "3 minutes" },
        { eventType: "Duty End", timestamp: "11:30 AM", location: "Sector 33", duration: null },
      ],
    }}
  const openPopup = (trv) => {
    setSelectedTRV(trv);
  };

  const closePopup = () => {
    setSelectedTRV(null);
  };

  return (
    <div>
      <h1>Timeline Monitoring System</h1>
      <div className="trv-list">
        {trvNames.map((trv) => (
          <div
            key={trv}
            className="trv-name"
            onClick={() => openPopup(trv)}
          >
            {trv}
          </div>
        ))}
      </div>

      {selectedTRV && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup-btn" onClick={closePopup}>
              ✖
            </button>
            <h3>{selectedTRV} Details</h3>
            <h4>Select a Date:</h4>
            <Calendar
              onChange={setDate}
              value={date}
            />
            <p>Selected Date: {date.toDateString()}</p>

            <h4>Duty History:</h4>
            {timelineDetails[selectedTRV]?.dutyHistory ? (
              <ul>
                <li><strong>Shift Start Time:</strong> {timelineDetails[selectedTRV].dutyHistory.shiftStartTime}</li>
                <li><strong>Shift End Time:</strong> {timelineDetails[selectedTRV].dutyHistory.shiftEndTime}</li>
                <li><strong>Duty Area:</strong> {timelineDetails[selectedTRV].dutyHistory.dutyArea}</li>
              </ul>
            ) : (
              <p>No duty history available for this TRV ID.</p>
            )}

            <h4>Movement Tracking:</h4>
            {timelineDetails[selectedTRV]?.movementTracking ? (
              <ul>
                <li><strong>Route Taken:</strong> {timelineDetails[selectedTRV].movementTracking.routeTaken}</li>
                <li>
                  <strong>Checkpoints:</strong>
                  <ul>
                    {timelineDetails[selectedTRV].movementTracking.checkpoints.map((checkpoint, index) => (
                      <li key={index}>
                        {checkpoint.location} at {checkpoint.timestamp}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ) : (
              <p>No movement tracking available for this TRV ID.</p>
            )}

            <h4>Timeline Events:</h4>
            {timelineDetails[selectedTRV]?.events ? (
              <ul>
                {timelineDetails[selectedTRV].events.map((event, index) => (
                  <li key={index}>
                    <strong>{event.eventType}:</strong> {event.timestamp} at {event.location} 
                    {event.duration && ` (Duration: ${event.duration})`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No timeline events available for this TRV ID.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TMS;
