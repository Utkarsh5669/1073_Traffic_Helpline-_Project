import React, { useState, useEffect } from "react";
import "../styles/InfoPage.css"; // Importing CSS for styling

const InfoPage = () => {
  // Load expanded sections from localStorage
  const getSavedState = () => {
    const saved = localStorage.getItem("infoExpanded");
    return saved ? JSON.parse(saved) : {};
  };

  const [expanded, setExpanded] = useState(getSavedState());

  // Save expanded sections to localStorage
  useEffect(() => {
    localStorage.setItem("infoExpanded", JSON.stringify(expanded));
  }, [expanded]);

  // Toggle sections
  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Info sections
  const infoItems = [
    {
      title: "Mission",
      content:
        "Our mission is to ensure that Chandigarh remains a safe city for all road users. We aim to reduce accidents, enforce traffic laws, and provide essential services to the public.",
    },
    {
      title: "Contact Us",
      content: (
        <ul>
          <li><strong>Emergency:</strong> 100</li>
          <li><strong>Traffic Control Room:</strong> 0172-2700777</li>
          <li><strong>For Road-related Issues:</strong> 0172-2701000</li>
          <li><strong>Chandigarh Police Department:</strong> 0172-2740401</li>
        </ul>
      ),
    },
    {
      title: "Departments and Services",
      content: (
        <ul>
          <li><strong>Traffic Management:</strong> Regulates traffic flow and congestion.</li>
          <li><strong>Law Enforcement:</strong> Enforces traffic laws and regulations.</li>
          <li><strong>Accident Investigation:</strong> Investigates road accidents.</li>
          <li><strong>Road Safety:</strong> Runs educational campaigns and initiatives.</li>
        </ul>
      ),
    },
    {
      title: "Key Areas of Focus",
      content: (
        <ul>
          <li><strong>Road Safety Programs:</strong> Awareness campaigns for safe driving.</li>
          <li><strong>Traffic Awareness Drives:</strong> Educating citizens about traffic rules.</li>
          <li><strong>Accident Prevention:</strong> Implementing better road signage and safety measures.</li>
          <li><strong>Vehicle Inspections:</strong> Ensuring vehicles meet safety standards.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="info-page-container">
      <h2>Chandigarh Traffic Police Information</h2>
      <p>Welcome to the official website of the Chandigarh Traffic Police. Our mission is to ensure the safety and efficiency of traffic within the city.</p>

      {infoItems.map((item, index) => (
        <div key={index} className="info-item">
          <h3 onClick={() => toggleExpand(index)} className="info-question">
            {item.title}
            <span className="info-toggle">{expanded[index] ? "▲" : "▼"}</span>
          </h3>
          {expanded[index] && <p className="info-answer">{item.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default InfoPage;
