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
          </div>
        </div>
      )}
    </div>
  );
};

export default TMS;
