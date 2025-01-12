import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>Info | Settings | FAQs | Support</p>
      </div>
      <div className="footer-icons">
        <a href="#!" aria-label="Facebook" className="footer-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#!" aria-label="Twitter" className="footer-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#!" aria-label="Instagram" className="footer-icon">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
