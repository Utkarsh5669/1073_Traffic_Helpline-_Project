import React, { useState, useEffect } from "react";
import "../styles/FaqsPage.css"; // Importing CSS for styling

const FaqsPage = () => {
  // Load expanded sections from localStorage
  const getSavedState = () => {
    const saved = localStorage.getItem("faqExpanded");
    return saved ? JSON.parse(saved) : {};
  };

  const [expanded, setExpanded] = useState(getSavedState());

  // Save expanded sections to localStorage
  useEffect(() => {
    localStorage.setItem("faqExpanded", JSON.stringify(expanded));
  }, [expanded]);

  // Toggle FAQ sections
  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // FAQ data
  const faqs = [
    {
      question: "What should I do if I am involved in a traffic accident?",
      answer:
        "If you are involved in an accident, ensure safety first. Call the Traffic Police at 100 for immediate assistance. Provide clear details about the incident and location.",
    },
    {
      question: "How can I pay a traffic fine?",
      answer:
        "You can pay your traffic fines online through our website or at designated bank branches. Visit the Pay Fines section for more details.",
    },
    {
      question: "How can I report a traffic violation?",
      answer:
        "If you witness a traffic violation, you can report it through our mobile app or by calling the traffic control room at 0172-2700777.",
    },
    {
      question: "What are the speed limits in Chandigarh?",
      answer:
        "Speed limits in the city are generally set at 40-60 km/h depending on the area. In residential areas, the speed limit is 30 km/h.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "For any inquiries or issues, please reach out to our customer support via email at support@chandigarhtraffic.gov.in.",
    },
    {
      question: "Where can I find traffic updates?",
      answer:
        "Traffic updates can be found on our Traffic Updates page or by following us on social media.",
    },
  ];

  return (
    <div className="faqs-page-container">
      <h2>Frequently Asked Questions</h2>

      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3 onClick={() => toggleExpand(index)} className="faq-question">
            {faq.question}
            <span className="faq-toggle">{expanded[index] ? "▲" : "▼"}</span>
          </h3>
          {expanded[index] && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FaqsPage;
