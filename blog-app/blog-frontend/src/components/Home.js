import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ZuAI Blog Posts</h1>
        </div>
        {/* Balloons */}
        <div className="balloon"></div>
        <div className="balloon"></div>
        <div className="balloon"></div>
        <div className="balloon"></div>
      </div>
    </div>
  );
}

export default Home;
