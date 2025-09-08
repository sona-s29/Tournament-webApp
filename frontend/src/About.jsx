import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <div className="about-banner-overlay">
          <h1>About Classy Tournament</h1>
          <p>
            Welcome to <span className="about-highlight">Classy Tournament</span> – the ultimate battleground for passionate gamers! Our platform is designed to bring together the best players, the most thrilling competitions, and a vibrant community where everyone can shine. Whether you’re a seasoned pro or a rising star, Classy Tournament is your gateway to glory, rewards, and unforgettable gaming moments.
          </p>
        </div>
      </div>
      <div className="about-cards-wrapper">
        <div className="about-card">
          <h2 className="about-card-title">🎯 Our Mission</h2>
          <p>
            To empower gamers by providing a fair, competitive, and exhilarating environment where skill and strategy are rewarded. We believe in fostering a community where every match is an opportunity to learn, grow, and achieve greatness.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">🌟 Our Vision</h2>
          <p>
            To become the leading online tournament platform, renowned for innovation, inclusivity, and integrity. We envision a world where eSports is accessible to all, and every player has a chance to become a legend.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">💡 Why Choose Us?</h2>
          <ul className="about-list">
            <li>AI-powered matchmaking for balanced and exciting games</li>
            <li>Secure, real-time slot management and instant notifications</li>
            <li>Transparent rules, fair play, and anti-cheat systems</li>
            <li>24/7 support and a welcoming community</li>
            <li>Regular events, leaderboards, and exclusive rewards</li>
          </ul>
        </div>
      </div>
      <div className="about-bottom-message">
        <h2>Join the Classy Tournament Revolution!</h2>
        <p>
          Step into the arena, showcase your skills, and become part of a new era in competitive gaming. <span className="about-highlight">Classy Tournament</span> is more than just a platform – it’s a movement. Are you ready to claim your victory?
        </p>
      </div>
    </div>
  );
}

export default About; 