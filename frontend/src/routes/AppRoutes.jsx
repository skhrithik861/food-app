import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/general/LandingPage";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import PartnerRegister from "../pages/PartnerRegister";
import PartnerLogin from "../pages/PartnerLogin";
import Home from "../pages/general/Home"

import CreateFood from "../pages/foodPartner/CreateFood";

import Profile from "../pages/foodPartner/Profile";

import Saved from "../pages/general/Saved";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />

          <Route path="/food-partner/register" element={<PartnerRegister />} />
          <Route path="/food-partner/login" element={<PartnerLogin />} />
          <Route path="/Home" element={<Home />} />

          <Route path="/food-partner/CreateFood" element={<CreateFood />} />
          <Route path="/food-partner/:id/partnerId" element={<Profile />} />
          {/* Backwards-compatible route used by older links */}
          <Route path="/food-partner/Profile/:id" element={<Profile />} />

          <Route path="/saved" element={<Saved />} />

          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
