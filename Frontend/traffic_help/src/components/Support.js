// import React from "react";
// import "../styles/SupportPage.css";  // Importing CSS for Support page

// const SupportPage = () => {
//   return (
//     <div className="support-page-container">
//       <h2>Support</h2>
//       <p>If you need help, please choose one of the following options:</p>

//       <h3>Technical Support</h3>
//       <p>If you're facing any issues with our website or mobile application, please contact us at <strong>support@chandigarhtraffic.gov.in</strong>.</p>

//       <h3>File a Complaint</h3>
//       <p>To file a traffic-related complaint, please visit our <a href="/complaints">Complaints</a> section.</p>

//       <h3>Feedback</h3>
//       <p>We value your feedback! Please fill out the <a href="/feedback">feedback form</a> to help us improve our services.</p>

//       <h3>Emergency Contacts</h3>
//       <ul>
//         <li>Emergency: 100</li>
//         <li>Traffic Control Room: 0172-2700777</li>
//         <li>Accident Reporting: 0172-2701000</li>
//       </ul>

//       <h3>Additional Resources</h3>
//       <p>For more assistance, check out our <a href="/help-center">Help Center</a> for guides and FAQs.</p>
//       <p>You can also follow us on social media for updates:</p>
//       <ul>
//         <li><a href="https://twitter.com/chdtraffic">Twitter</a></li>
//         <li><a href="https://facebook.com/chdtraffic">Facebook</a></li>
//       </ul>
//     </div>
//   );
// };

// export default SupportPage;

import React, { useState, useEffect } from "react";
import "../styles/SupportPage.css"; // Importing CSS for styling

const SupportPage = () => {
  // Load expanded sections from localStorage
  const getSavedState = () => {
    const saved = localStorage.getItem("supportExpanded");
    return saved ? JSON.parse(saved) : {};
  };

  const [expanded, setExpanded] = useState(getSavedState());

  // Save expanded sections to localStorage
  useEffect(() => {
    localStorage.setItem("supportExpanded", JSON.stringify(expanded));
  }, [expanded]);

  // Toggle sections
  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Support sections
  const supportItems = [
    {
      title: "Technical Support",
      content:
        "If you're facing any issues with our website or mobile application, please contact us at support@chandigarhtraffic.gov.in.",
    },
    {
      title: "File a Complaint",
      content: "To file a traffic-related complaint, please visit our Complaints section.",
      link: "/complaints",
    },
    {
      title: "Feedback",
      content: "We value your feedback! Please fill out the feedback form to help us improve our services.",
      link: "/feedback",
    },
    {
      title: "Emergency Contacts",
      content: (
        <ul>
          <li><strong>Emergency:</strong> 100</li>
          <li><strong>Traffic Control Room:</strong> 0172-2700777</li>
          <li><strong>Accident Reporting:</strong> 0172-2701000</li>
        </ul>
      ),
    },
    {
      title: "Additional Resources",
      content: (
        <>
          <p>For more assistance, check out our <a href="/help-center">Help Center</a> for guides and FAQs.</p>
          <p>Follow us on social media for updates:</p>
          <ul>
            <li><a href="https://twitter.com/chdtraffic">Twitter</a></li>
            <li><a href="https://facebook.com/chdtraffic">Facebook</a></li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="support-page-container">
      <h2>Support</h2>
      <p>If you need help, please choose one of the following options:</p>

      {supportItems.map((item, index) => (
        <div key={index} className="support-item">
          <h3 onClick={() => toggleExpand(index)} className="support-question">
            {item.title}
            <span className="support-toggle">{expanded[index] ? "▲" : "▼"}</span>
          </h3>
          {expanded[index] && <p className="support-answer">{item.link ? <a href={item.link}>{item.content}</a> : item.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default SupportPage;
