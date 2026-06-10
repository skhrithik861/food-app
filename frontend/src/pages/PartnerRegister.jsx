import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/api/auth/food-partner/register", {
        name,
        contactName,
        phone,
        address,
        email,
        password,
      });

      console.log(response.data);
      navigate("/food-partner/CreateFood");
    } catch (error) {
      console.error("Partner registration failed:", error);
      alert(
        error.response?.data?.message ||
          "Unable to connect to the server. Please check your backend and try again.",
      );
    }
  };

  return (
    <div className="auth-page">
      {/* Animated gradient background */}
      <div className="auth-bg-gradient"></div>

      {/* Form card */}
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Partner registration</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Business name</label>
            <input type="text" name="name" placeholder="My Restaurant" />
          </div>

          <div className="form-row">
            <label>Contact name</label>
            <input type="text" name="contactName" placeholder="Alex Rivera" />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="(123) 456-7890" />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="123 Market Street, City"
            />
          </div>

          <div className="form-row">
            <label>Contact email</label>
            <input type="email" name="email" placeholder="owner@example.com" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/food-partner/login")}
            >
              Sign in
            </button>
          </div>

          <p className="auth-title">
            Register as a&nbsp;
            <Link to="/user/register">normal user</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
