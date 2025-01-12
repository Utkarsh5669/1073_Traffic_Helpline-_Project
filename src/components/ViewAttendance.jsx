import React, { useState } from "react";
import "../styles/ViewAttendance.css";

const ViewAttendance = () => {
  const responders = [
    {
      id: 1,
      name: "TRV# 0011",
      beltNumber: "12345",
      loginTime: "07:00 AM",
      loginId: "login_0011",
      loginLocation: "Sector 9, Chandigarh",
      currentLocation: "Sector 9, Chandigarh",
      dutyArea: "Sector 8, Sector 9",
      mapLocation: "30.7333,76.7794", // Latitude and Longitude for Google Maps
    },
    {
      id: 2,
      name: "TRV# 0012",
      beltNumber: "12346",
      loginTime: "08:30 AM",
      loginId: "login_0012",
      loginLocation: "Sector 17, Chandigarh",
      currentLocation: "Sector 17, Chandigarh",
      dutyArea: "Sector 16, Sector 17",
      mapLocation: "30.7415,76.7683",
    },
    {
      id: 3,
      name: "TRV# 0013",
      beltNumber: "12347",
      loginTime: "09:00 AM",
      loginId: "login_0013",
      loginLocation: "Sector 22, Chandigarh",
      currentLocation: "Sector 22, Chandigarh",
      dutyArea: "Sector 21, Sector 22",
      mapLocation: "30.7269,76.7644",
    },
    {
      id: 4,
      name: "TRV# 0014",
      beltNumber: "12348",
      loginTime: "07:15 AM",
      loginId: "login_0014",
      loginLocation: "Sector 15, Chandigarh",
      currentLocation: "Sector 15, Chandigarh",
      dutyArea: "Sector 14, Sector 15",
      mapLocation: "30.7456,76.7618",
    },
    {
      id: 5,
      name: "TRV# 0015",
      beltNumber: "12349",
      loginTime: "08:00 AM",
      loginId: "login_0015",
      loginLocation: "Sector 35, Chandigarh",
      currentLocation: "Sector 35, Chandigarh",
      dutyArea: "Sector 34, Sector 35",
      mapLocation: "30.7326,76.7864",
    },
  ];

  const [selectedResponder, setSelectedResponder] = useState(null);

  const openPopup = (responder) => {
    setSelectedResponder(responder);
  };

  const closePopup = () => {
    setSelectedResponder(null);
  };

  return (
    <div className="view-attendance-container">
      <h2>View Attendance</h2>
      <div className="responder-list">
        {responders.map((responder) => (
          <div
            key={responder.id}
            className="responder-name"
            onClick={() => openPopup(responder)}
          >
            {responder.name}
          </div>
        ))}
      </div>

      {selectedResponder && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup-btn" onClick={closePopup}>
              ✖
            </button>
            <h3>Attendance Details</h3>
            <p>
              <strong>Name:</strong> {selectedResponder.name}
            </p>
            <p>
              <strong>Belt Number:</strong> {selectedResponder.beltNumber}
            </p>
            <p>
              <strong>Login Time:</strong> {selectedResponder.loginTime}
            </p>
            <p>
              <strong>Login ID:</strong> {selectedResponder.loginId}
            </p>
            <p>
              <strong>Login Location:</strong> {selectedResponder.loginLocation}
            </p>
            <p>
              <strong>Current Location:</strong> {selectedResponder.currentLocation}
            </p>
            <p>
              <strong>Duty Area:</strong> {selectedResponder.dutyArea}
            </p>
            <h4>Current Location Map:</h4>
            <div className="map-container">
              <iframe
                title="Location Map"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=Chandigarh&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
