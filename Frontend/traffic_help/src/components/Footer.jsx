import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Link to="/info">Info</Link> | 
        <Link to="/settings">Settings</Link> | 
        <Link to="/faqs">FAQs</Link> | 
        <Link to="/support">Support</Link>
      </div>
    </footer>
  );
};

export default Footer;
