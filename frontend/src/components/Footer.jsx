import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/tournaments">Tournaments</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a className="footer-social-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /> Instagram</a>
            <a className="footer-social-link" href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaTelegram size={20} /> Telegram</a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: classytournamentofficial@gmail.com</p>
          <p>Phone: +91 7112231982</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Classy Tournament. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 