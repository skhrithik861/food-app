import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  //logic of form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/api/auth/user/register", {
        fullName,
        email,
        password,
      });

      console.log(response.data);
      navigate("/Home");
    } catch (error) {
      console.error("Registration failed:", error);
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
          <h2 className="auth-title">Create your account</h2>
          
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input type="text" name="fullName" placeholder="Jane Doe" />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" />
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
              Create account
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/user/login")}
            >
              Sign in
            </button>
          </div>

          <p className="auth-title">
            Register as a&nbsp;
            <Link to="/food-partner/register" className="btn-link">
              food partner
            </Link>
          </p>
        
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
