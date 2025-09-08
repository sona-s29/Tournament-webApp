import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className='navbar-logo' src={logo} alt="Classy Tournament Logo" />
        <span className="navbar-title">Classy Tournament</span>
      </div>
      <div className="navbar-hamburger" onClick={handleHamburgerClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'navlink-active' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'navlink-active' : ''}>About</NavLink></li>
        <li><NavLink to="/tournaments" className={({ isActive }) => isActive ? 'navlink-active' : ''}>Tournaments</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'navlink-active' : ''}>Contact</NavLink></li>
        <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'navlink-active' : ''}>Admin</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar; 