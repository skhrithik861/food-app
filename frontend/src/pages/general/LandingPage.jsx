import React from "react";
import "../../styles/landing.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-overlay"></div>

      <div className="landing-content">
        <img src={logo} alt="To-Yumm Logo" className="landing-logo" />

        <h1 className="brand-title">
          Welcome to <span>To-Yumm</span>
        </h1>

        <p className="brand-subtitle">
          Discover amazing food reels, connect with food partners,
          and explore delicious experiences near you.
        </p>

        <div className="landing-buttons">
          <button
            className="register-btn user-btn"
            onClick={() => navigate("user/register")}
          >
            Register as User
          </button>

          <button
            className="register-btn partner-btn"
            onClick={() => navigate("/food-partner/register")}
          >
            Register as Food Partner
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;