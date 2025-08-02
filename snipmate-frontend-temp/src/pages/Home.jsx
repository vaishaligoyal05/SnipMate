import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to SnipMate</h1>
        <p className="hero-subtitle">
          Your ultimate snippet manager — save, organize, and access your code anywhere.
        </p>
        <a href="/register" className="hero-button">Get Started</a>
      </div>
    </div>
  );
}

export default Home;
