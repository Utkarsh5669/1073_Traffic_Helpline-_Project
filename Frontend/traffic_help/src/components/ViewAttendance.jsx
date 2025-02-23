import React, { useState, useEffect, useRef } from "react";
import "../styles/ViewAttendance.css";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in .env

const loadGoogleMaps = (callback) => {
  if (!window.google) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

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
    {
      id: 6,
      name: "TRV# 0016",
      beltNumber: "12350",
      loginTime: "07:30 AM",
      loginId: "login_0016",
      loginLocation: "Sector 20, Chandigarh",
      currentLocation: "Sector 20, Chandigarh",
      dutyArea: "Sector 19, Sector 20",
      mapLocation: "30.7394,76.7799",
    },
    {
      id: 7,
      name: "TRV# 0017",
      beltNumber: "12351",
      loginTime: "08:15 AM",
      loginId: "login_0017",
      loginLocation: "Sector 18, Chandigarh",
      currentLocation: "Sector 18, Chandigarh",
      dutyArea: "Sector 17, Sector 18",
      mapLocation: "30.7341,76.7658",
    },
    {
      id: 8,
      name: "TRV# 0018",
      beltNumber: "12352",
      loginTime: "09:15 AM",
      loginId: "login_0018",
      loginLocation: "Sector 16, Chandigarh",
      currentLocation: "Sector 16, Chandigarh",
      dutyArea: "Sector 15, Sector 16",
      mapLocation: "30.7401,76.7624",
    },
    {
      id: 9,
      name: "TRV# 0019",
      beltNumber: "12353",
      loginTime: "08:45 AM",
      loginId: "login_0019",
      loginLocation: "Sector 14, Chandigarh",
      currentLocation: "Sector 14, Chandigarh",
      dutyArea: "Sector 13, Sector 14",
      mapLocation: "30.7462,76.7575",
    },
    {
      id: 10,
      name: "TRV# 0020",
      beltNumber: "12354",
      loginTime: "07:50 AM",
      loginId: "login_0020",
      loginLocation: "Sector 12, Chandigarh",
      currentLocation: "Sector 12, Chandigarh",
      dutyArea: "Sector 11, Sector 12",
      mapLocation: "30.7523,76.7524",
    },
    {
      id: 11,
      name: "TRV# 0021",
      beltNumber: "12355",
      loginTime: "08:10 AM",
      loginId: "login_0021",
      loginLocation: "Sector 11, Chandigarh",
      currentLocation: "Sector 11, Chandigarh",
      dutyArea: "Sector 10, Sector 11",
      mapLocation: "30.7540,76.7498",
    },
    {
      id: 12,
      name: "TRV# 0022",
      beltNumber: "12356",
      loginTime: "09:20 AM",
      loginId: "login_0022",
      loginLocation: "Sector 10, Chandigarh",
      currentLocation: "Sector 10, Chandigarh",
      dutyArea: "Sector 9, Sector 10",
      mapLocation: "30.7559,76.7475",
    },
    {
      id: 13,
      name: "TRV# 0023",
      beltNumber: "12357",
      loginTime: "07:40 AM",
      loginId: "login_0023",
      loginLocation: "Sector 9, Chandigarh",
      currentLocation: "Sector 9, Chandigarh",
      dutyArea: "Sector 8, Sector 9",
      mapLocation: "30.7574,76.7460",
    },
    {
      id: 14,
      name: "TRV# 0024",
      beltNumber: "12358",
      loginTime: "08:05 AM",
      loginId: "login_0024",
      loginLocation: "Sector 8, Chandigarh",
      currentLocation: "Sector 8, Chandigarh",
      dutyArea: "Sector 7, Sector 8",
      mapLocation: "30.7595,76.7436",
    },
    {
      id: 15,
      name: "TRV# 0025",
      beltNumber: "12359",
      loginTime: "09:05 AM",
      loginId: "login_0025",
      loginLocation: "Sector 7, Chandigarh",
      currentLocation: "Sector 7, Chandigarh",
      dutyArea: "Sector 6, Sector 7",
      mapLocation: "30.7610,76.7401",
    },
  ];

  const [selectedResponder, setSelectedResponder] = useState(null);
  const mapRef = useRef(null);

  const openPopup = (responder) => {
    setSelectedResponder(responder);
  };

  const closePopup = () => {
    setSelectedResponder(null);
  };

  const initMap = (lat, lng) => {
    if (window.google && window.google.maps) {
      const location = new window.google.maps.LatLng(lat, lng);
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: location,
      });
      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    }
  };

  useEffect(() => {
    if (selectedResponder) {
      const [lat, lng] = selectedResponder.mapLocation.split(",").map(Number);
      loadGoogleMaps(() => initMap(lat, lng));
    }
  }, [selectedResponder]);

  return (
    <div className="view-attendance-container">
      <h2>View Attendance</h2>
      <div className="responder-list">
        {responders.map((responder) => (
          <div key={responder.id} className="responder-name" onClick={() => openPopup(responder)}>
            {responder.name}
          </div>
        ))}
      </div>

      {selectedResponder && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup-btn" onClick={closePopup}>✖</button>
            <h3>Attendance Details</h3>
            <p><strong>Name:</strong> {selectedResponder.name}</p>
            <p><strong>Belt Number:</strong> {selectedResponder.beltNumber}</p>
            <p><strong>Login Time:</strong> {selectedResponder.loginTime}</p>
            <p><strong>Login ID:</strong> {selectedResponder.loginId}</p>
            <p><strong>Login Location:</strong> {selectedResponder.loginLocation}</p>
            <p><strong>Current Location:</strong> {selectedResponder.currentLocation}</p>
            <p><strong>Duty Area:</strong> {selectedResponder.dutyArea}</p>
            <h4>Current Location Map:</h4>
            <div className="map-container" ref={mapRef} style={{ height: "250px", width: "100%" }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
