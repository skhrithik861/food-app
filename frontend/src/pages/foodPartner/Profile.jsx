import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await api.get(`/api/food-partner/${id}`);

        const partner = response.data.foodPartner;
        setProfile(partner);
        setVideos(partner?.foodItems || []);
      } catch (error) {
        console.error("Error fetching food partner profile:", error);
      }
    };

    fetchPartner();
  }, [id]);

  // IntersectionObserver for autoplay/pause
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const els = Array.from(document.querySelectorAll(".partner-video"));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            vid.play().catch(() => {});
          } else {
            try {
              vid.pause();
            } catch (e) {}
          }
        });
      },
      { threshold: [0.25, 0.6, 0.9] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [videos]);

  return (
    <div className="profile-page">
      <div className="profile-shell">
        <section className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar">FP</div>
            <div className="profile-details">
              <h1 className="profile-name">{profile?.name}</h1>
              <div className="profile-address-card">
                <p className="profile-address">{profile?.address}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <p className="profile-stat-title">Total Meals</p>
              <p className="profile-stat-value">43</p>
            </div>
            <div className="profile-stat">
              <p className="profile-stat-title">Customer Serve</p>
              <p className="profile-stat-value">15K</p>
            </div>
          </div>

          {/* Videos */}
          <div className="video-grid">
            {videos.length === 0 && <p>No videos uploaded yet.</p>}
            {videos.map((item) => (
              <div key={item._id} className="video-card">
                <video
                  src={item.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="partner-video"
                  controls={false}
                />
                <p className="video-title">{item.name}</p>
                <p className="video-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ✅ Footer Navigation */}
      <nav className="footer-nav">
        <button className="like-btn" onClick={() => navigate("/Home")}>
          🏠 Home
        </button>
        <button className="like-btn" onClick={() => navigate("/saved")}>
          📁 Saved
        </button>
      </nav>
    </div>
  );
};

export default Profile;
