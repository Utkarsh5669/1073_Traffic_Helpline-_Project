import React from "react";
import "../styles/FaqsPage.css";  // Importing CSS for FAQs page

const FaqsPage = () => {
  return (
    <div className="faqs-page-container">
      <h2>Frequently Asked Questions</h2>

      <h3>What should I do if I am involved in a traffic accident?</h3>
      <p>If you are involved in an accident, ensure safety first. Call the Traffic Police at <strong>100</strong> for immediate assistance. Provide clear details about the incident and location.</p>

      <h3>How can I pay a traffic fine?</h3>
      <p>You can pay your traffic fines online through our website or at designated bank branches. Visit the <a href="/pay-fines">Pay Fines</a> section for more details.</p>

      <h3>How can I report a traffic violation?</h3>
      <p>If you witness a traffic violation, you can report it through our mobile app or by calling the traffic control room at <strong>0172-2700777</strong>.</p>

      <h3>What are the speed limits in Chandigarh?</h3>
      <p>Speed limits in the city are generally set at <strong>40-60 km/h</strong> depending on the area. In residential areas, the speed limit is <strong>30 km/h</strong>.</p>

      <h3>How can I contact customer support?</h3>
      <p>For any inquiries or issues, please reach out to our customer support via email at <strong>support@chandigarhtraffic.gov.in</strong>.</p>

      <h3>Where can I find traffic updates?</h3>
      <p>Traffic updates can be found on our <a href="/traffic-updates">Traffic Updates</a> page or by following us on social media.</p>
    </div>
  );
};

export default FaqsPage;
