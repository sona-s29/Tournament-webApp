import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-section">
        <h2>Introduction</h2>
        <p>At Classy Tournament, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.</p>
      </div>
      <div className="privacy-section">
        <h2>Information We Collect</h2>
        <ul>
          <li>Account information (name, email, UID, etc.)</li>
          <li>Payment details (processed securely via third-party gateways)</li>
          <li>Gameplay and participation data</li>
          <li>Device and usage information</li>
        </ul>
      </div>
      <div className="privacy-section">
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To manage tournament participation and slot allocation</li>
          <li>To process payments and distribute rewards</li>
          <li>To improve our platform and user experience</li>
          <li>To communicate important updates and notifications</li>
        </ul>
      </div>
      <div className="privacy-section">
        <h2>Your Rights</h2>
        <ul>
          <li>Access and update your personal information</li>
          <li>Request deletion of your account</li>
          <li>Opt out of marketing communications</li>
        </ul>
      </div>
      <div className="privacy-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about your privacy, please contact us at <a href="mailto:support@classytournament.com">support@classytournament.com</a>.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 