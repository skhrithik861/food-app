// src/pages/Saved.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([]);
  const navigate = useNavigate();

  // Fetch saved videos when page loads
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await api.get("/api/food/saved");
        setSavedVideos(res.data.saveFoods || []);
      } catch (err) {
        console.error("Saved Fetch Error:", err);
      }
    };
    fetchSaved();
  }, []);

  return (
    <main className="reel-page">
      {savedVideos.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
          No saved videos yet 📁
        </h2>
      ) : (
        savedVideos.map((item) => (
          <section className="reel-slide" key={item._id}>
            <video
              className="reel-video"
              src={item.food.video}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="reel-overlay"></div>

            <div className="reel-content">
              <h2 className="reel-title">{item.food.name}</h2>
              <p className="reel-description">{item.food.description}</p>
              <div className="reel-action-row">
                <button
                  className="visit-store-btn"
                  onClick={() =>
                    navigate(`/food-partner/Profile/${item.food.foodPartner}`)
                  }
                >
                  Visit Store
                </button>
              </div>
            </div>
          </section>
        ))
      )}

      {/* Footer Navigation */}
      <nav className="footer-nav">
        <button className="like-btn" onClick={() => navigate("/Home")}>
          🏠 Home
        </button>
      </nav>
    </main>
  );
};

export default Saved;
