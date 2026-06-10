import React from "react";
import "../styles/auth.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;

    try {
      const response = await api.post("/api/auth/food-partner/login", {
        email,
        password,
      });
      console.log(response.data);
      navigate("/food-partner/CreateFood");
    } catch (error) {
      console.error("Partner login failed:", error);
      alert(
        error.response?.data?.message ||
          "Unable to connect to the server. Please check your backend and try again.",
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Partner sign in</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Business email</label>
            <input type="email" name="email" placeholder="owner@example.com" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/food-partner/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;
