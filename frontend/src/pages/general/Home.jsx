import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  // Fetch all videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get("/api/food");

      setVideos(response.data.foodItems);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Like / Unlike
  const likeVideo = async (item) => {
    try {
      const response = await api.post("/api/food/like", { foodId: item._id });

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === item._id
            ? { ...video, likeCount: response.data.likeCount }
            : video,
        ),
      );
    } catch (error) {
      console.error("Like Error:", error);
    }
  };

  const saveVideo = async (item) => {
    try {
      const response = await api.post("/api/food/save", { foodId: item._id });

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === item._id
            ? {
                ...video,
                savesCount: response.data.savesCount,
              }
            : video,
        ),
      );
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  return (
    <main className="reel-page">
      {videos.map((item) => (
        <section className="reel-slide" key={item._id}>
          <video
            className="reel-video"
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="reel-overlay"></div>

          <div className="reel-side-actions">
            {/* Like Button */}
            <button className="like-btn" onClick={() => likeVideo(item)}>
              ❤️ {item.likeCount || 0}
            </button>

            {/* Save Button */}
            <button className="like-btn" onClick={() => saveVideo(item)}>
              📌 {item.savesCount || 0}
            </button>
          </div>

          <div className="reel-content">
            <h2 className="reel-title">{item.name}</h2>
            <p className="reel-description">{item.description}</p>
            <div className="reel-action-row">
              <button
                className="visit-store-btn"
                onClick={() =>
                  navigate(`/food-partner/Profile/${item.foodPartner}`)
                }
              >
                Visit Store
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* ✅ Bottom Footer Navigation */}
      <nav className="footer-nav">
        <button
          className="like-btn"
          onClick={() => {
            navigate("/");

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          🏠 Home
        </button>
        <button className="like-btn" onClick={() => navigate("/saved")}>
          📁 Saved
        </button>
      </nav>
    </main>
  );
};

export default Home;
