// import React from "react";
// import "../styles/Responder.css";

// const Responders = () => {
//   const responders = [
//     {
//       id: 1,
//       name: "TRV# 0011",
//       beltNumber: "12345",
//       status: "Available",
//       Duty_Incharge: { name: "ASI Ram", phone: "9876543210" },
//       location: "Sector 9, Chandigarh",
//     },
//     {
//       id: 2,
//       name: "TRV# 0012",
//       beltNumber: "12346",
//       status: "On Duty",
//       Duty_Incharge: { name: "ASI Shubham", phone: "9876543211" },
//       location: "Sector 17, Chandigarh",
//     },
//     {
//       id: 3,
//       name: "TRV# 0013",
//       beltNumber: "12347",
//       status: "On Break",
//       Duty_Incharge: { name: "SI Utkarsh", phone: "9876543212" },
//       location: "Sector 22, Chandigarh",
//     },
//     {
//       id: 4,
//       name: "TRV# 0014",
//       beltNumber: "12348",
//       status: "Available",
//       Duty_Incharge: { name: "ASI Satish", phone: "9876543213" },
//       location: "Sector 15, Chandigarh",
//     },
//     {
//       id: 5,
//       name: "TRV# 0015",
//       beltNumber: "12349",
//       status: "On Duty",
//       Duty_Incharge: { name: "ASI Vishal", phone: "9876543214" },
//       location: "Sector 35, Chandigarh",
//     },
//   ];

//   return (
//     <div className="responders-container">
//       <h2>Responders</h2>
//       <div className="responder-list">
//         {responders.map((responder) => (
//           <div key={responder.id} className="responder-card">
//             <h3 className="responder-name">{responder.name}</h3>
//             <p className="responder-belt-number">Belt Number: {responder.beltNumber}</p>
//             <p className="responder-Duty_Incharge">
//               Duty Incharge: {responder.Duty_Incharge.name} (Phone: {responder.Duty_Incharge.phone})
//             </p>
//             <p className="responder-status">
//               Status:{" "}
//               <span
//                 className={`status-badge ${
//                   responder.status === "Available"
//                     ? "available"
//                     : responder.status === "On Duty"
//                     ? "on-duty"
//                     : "on-break"
//                 }`}
//               >
//                 {responder.status}
//               </span>
//             </p>
//             <p className="responder-location">Location: {responder.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Responders;

import React, { useState, useEffect } from "react";
import "../styles/Responder.css";

const Responders = () => {
  const [responders, setResponders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal

  useEffect(() => {
    const fetchResponders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/responders");

        if (!response.ok) {
          throw new Error("Failed to fetch responders");
        }

        const data = await response.json();

        if (Array.isArray(data.responders)) {
          setResponders(data.responders);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching responders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponders();
  }, []);

  return (
    <div className="responders-container">
      <h2>Responders</h2>
      <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
        View Responders
      </button>

      {isModalOpen && responders.length > 0 && (
  <div className="modal">
    <div className="modal-content">
      <span className="close-btn" onClick={() => setIsModalOpen(false)}>
        &times;
      </span>
      <h2>Responders List</h2>
      <div className="responder-grid">
        {responders.map((responder) => (
          <div className="responder-card" key={responder.id}>
            <h3>{responder.rank} {responder.name}</h3>
            <p><strong>Belt No:</strong> {responder.belt_no}</p>
            <p><strong>Phone:</strong> {responder.phone_number}</p>
            <p><strong>BEAT No.:</strong> 
              <span className={`status-badge ${responder.status?.toLowerCase() || "unknown"}`}>
                {responder.status || "Unknown"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Responders;
