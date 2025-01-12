import React from "react";
import "../styles/Responder.css";

const Responders = () => {
  const responders = [
    {
      id: 1,
      name: "TRV# 0011",
      beltNumber: "12345",
      status: "Available",
      Duty_Incharge: "ASI Ram",
      location: "Sector 9, Chandigarh",
    },
    {
      id: 2,
      name: "TRV# 0012",
      beltNumber: "12346",
      status: "On Duty",
      Duty_Incharge: "ASI Shubham",
      location: "Sector 17, Chandigarh",
    },
    {
      id: 3,
      name: "TRV# 0013",
      beltNumber: "12347",
      status: "On Break",
      Duty_Incharge: "SI Utkarsh",
      location: "Sector 22, Chandigarh",
    },
    {
      id: 4,
      name: "TRV# 0014",
      beltNumber: "12348",
      status: "Available",
      Duty_Incharge: "ASI Satish",
      location: "Sector 15, Chandigarh",
    },
    {
      id: 5,
      name: "TRV# 0015",
      beltNumber: "12349",
      status: "On Duty",
      Duty_Incharge: "ASI Vishal",
      location: "Sector 35, Chandigarh",
    },
  ];

  return (
    <div className="responders-container">
      <h2>Responders</h2>
      <div className="responder-list">
        {responders.map((responder) => (
          <div key={responder.id} className="responder-card">
            <h3 className="responder-name">{responder.name}</h3>
            <p className="responder-belt-number">Belt Number: {responder.beltNumber}</p>
            <p className="responder-Duty_Incharge">Duty Incharge: {responder.Duty_Incharge}</p>
            <p className="responder-status">
              Status:{" "}
              <span
                className={`status-badge ${
                  responder.status === "Available"
                    ? "available"
                    : responder.status === "On Duty"
                    ? "on-duty"
                    : "on-break"
                }`}
              >
                {responder.status}
              </span>
            </p>
            <p className="responder-location">Location: {responder.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responders;
