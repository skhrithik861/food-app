import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  //logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/api/auth/user/login", {
        email,
        password,
      });

      console.log(response.data);
      navigate("/Home"); // redirect to home page after login
    } catch (error) {
      console.error("Login failed:", error);
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
          <h2 className="auth-title">Welcome back</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" />
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
              onClick={() => navigate("/user/register")}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
