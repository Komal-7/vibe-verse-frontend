import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>VibeVerse</h1>
      </div>
      <div className="navbar-subtitle">
        <span>- A Mood and Activity-Based Music Recommendation System</span>
      </div>
    </nav>
  );
};

export default Navbar;
